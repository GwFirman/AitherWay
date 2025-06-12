import puppeteer, { Browser, Page } from "puppeteer-core";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { GoogleGenAI } from "@google/genai";

const prisma = new PrismaClient();

export default class GMaps {
	private browser: Browser | null = null;

	constructor() {}

	private async initBrowser(): Promise<Browser> {
		if (this.browser) return this.browser;
		this.browser = await puppeteer.launch({
			executablePath:
				process.platform === "linux" //
					? "/usr/bin/google-chrome"
					: "C:/Program Files/Google/Chrome/Application/chrome.exe",
			userDataDir: path.join(__dirname, "../", "userData"),
			headless: false,
			defaultViewport: { height: 800, width: 1280 },
			args: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				'--disable-blink-features="AutomationControlled"',
				"--disable-dev-shm-usage",
				"--disable-infobars",
				"--disable-background-networking",
				"--disable-gpu", //
				"--no-first-run",
			],
		});
		return this.browser;
	}

	// Helper function untuk repeat click dengan interval 1 detik
	private async repeatClickUntilSuccess(page: Page, element: any, maxAttempts: number = 10): Promise<boolean> {
		for (let attempt = 1; attempt <= maxAttempts; attempt++) {
			try {
				await element.click();
				console.log(`Click berhasil pada attempt ke-${attempt}`);
				return true;
			} catch (error) {
				console.log(`Click gagal pada attempt ke-${attempt}, mencoba lagi...`);
				if (attempt < maxAttempts) {
					await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
				}
			}
		}
		console.log(`Gagal click setelah ${maxAttempts} attempts`);
		return false;
	}

	public async getDetails(search: string, saveToDB: boolean): Promise<void> {
		let page: Page | null = null;

		try {
			const browser = await this.initBrowser();
			page = await browser.newPage();

			await page.setRequestInterception(true);

			page.on("request", (req) => {
				const url = req.url();
				if (
					url.includes("/maps/vt/") //
					// url.includes("ping")
				) {
					req.abort();
				} else {
					req.continue();
				}
			});

			await page.goto("https://www.google.com/maps");
			await page.type("input[name='q']", search);
			await page.keyboard.press("Enter");
			await page.waitForSelector(`div[jstcache="3"]`, { visible: true });

			let isFeed = !!(await page.$(`div[role="feed"]`));

			if (isFeed) {
				const isEndVisible = async () => {
					return page?.evaluate(() => {
						return new Promise((resolve) => {
							const el = document.querySelector("span.HlvSq");
							if (!el) return resolve(false);

							const observer = new IntersectionObserver((entries) => {
								resolve(entries[0].isIntersecting);
								observer.disconnect();
							});

							observer.observe(el);
						});
					});
				};

				while (!(await isEndVisible())) {
					const items = await page.$$(`div[role="feed"] > div`);

					for (const item of items) {
						const isProcessed = await item.evaluate((el) => el.dataset._done === "1");
						if (isProcessed) continue;
						await item.evaluate((el) => (el.dataset._done = "1"));

						const aTag = await item.$("div > a");
						if (!aTag) continue;

						await aTag.evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "start" }));
						let nama1 = await aTag.$eval(`div[role="feed"] > div > div > div .fontHeadlineSmall`, (el) => el.textContent?.trim());
						if (saveToDB && nama1) {
							const existingPlace = await prisma.maps.findUnique({
								where: { nama: nama1 },
							});
							if (existingPlace) {
								console.log(`Tempat "${nama1}" sudah ada di database, diskip.`);
								continue;
							}
						}
						await page.waitForNetworkIdle({ concurrency: 8 });

						const aTagClicked = await this.repeatClickUntilSuccess(page, aTag);
						if (!aTagClicked) continue;

						await page.waitForNetworkIdle({ concurrency: 8 });
						await page.waitForSelector(`div[jstcache="4"]`, { visible: true });

						await page.waitForSelector(`div[jstcache="4"] h1`, { visible: true });
						const nama = await page.$eval(`div[jstcache="4"] h1`, (el) => el.textContent?.trim());

						const alamat = await page.$eval(`div[jstcache="4"] div.Io6YTe`, (el) => el.textContent?.trim());
						const gambar = await page.$eval(`div[jstcache="4"] img`, (el) => el.getAttribute("src"));

						// Tambahkan pengecekan untuk total_ulasan
						let total_ulasan = "";
						const totalUlasanEl = await page.$(`div[jstcache="4"] div.TIHn2 .F7nice span span span[aria-label]`);
						if (totalUlasanEl) {
							total_ulasan = await page.evaluate((el) => el.textContent?.match(/\d[\d.,]*/)?.[0] || "", totalUlasanEl);
						} else {
							total_ulasan = "0";
						}

						let rating;
						let ulasans: any[] = [];

						// PENAMBAHAN: Blok try...catch untuk proses klik tab ulasan
						try {
							await page.evaluate(() => {
								const buttons = Array.from(document.querySelectorAll('div[role="tablist"] > button'));
								const target = buttons.find((btn) => btn.textContent?.trim().toLowerCase() === "ulasan");
								if (target) {
									let attempts = 0;
									const maxAttempts = 10;
									const clickInterval = setInterval(() => {
										attempts++;
										try {
											(target as HTMLElement).click();
											console.log(`Tab ulasan clicked on attempt ${attempts}`);
											clearInterval(clickInterval);
										} catch (error) {
											if (attempts >= maxAttempts) {
												console.log(`Failed to click tab ulasan after ${maxAttempts} attempts`);
												clearInterval(clickInterval);
												// Melempar error agar bisa ditangkap oleh blok catch di luar
												throw new Error("Gagal mengklik tab ulasan.");
											}
										}
									}, 1000);
								} else {
									throw new Error("Tombol tab ulasan tidak ditemukan.");
								}
							});
							await page.waitForNetworkIdle({ concurrency: 8 });

							await page.waitForSelector(`div[jstcache="4"] h1`, { hidden: true });
							await page.waitForSelector(`div[data-review-id][jslog]`, { visible: true });

							rating = await page.$eval(`div.fontDisplayLarge`, (el) => el.textContent?.trim());

							for (let i = 1; i <= 2; i++) {
								for (const reviewHandle of await page.$$(`div[data-review-id][jslog]`)) {
									const isProcessed = await reviewHandle.evaluate((el) => el.dataset._done === "1");
									if (isProcessed) continue;
									await reviewHandle.evaluate((el) => (el.dataset._done = "1"));

									await reviewHandle.evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "start" }));
									const expandBtn = await reviewHandle.$(`button[aria-expanded="false"]`);
									if (expandBtn) {
										await this.repeatClickUntilSuccess(page, expandBtn);
									}
									const data = await reviewHandle.evaluate((div) => {
										const nama = div.querySelector(".d4r55")?.textContent?.trim() || null;
										const ulasan = div.querySelector(".MyEned span")?.textContent?.trim() || null;
										const ratingEl = div.querySelector(".kvMYJc");
										const rating = ratingEl?.getAttribute("aria-label")?.match(/\d+/)?.[0] || null;
										const fotoEls = div.querySelectorAll(".Tya61d");
										const foto = Array.from(fotoEls)
											.map((btn) => {
												const style = btn.getAttribute("style") || "";
												const match = style.match(/url\(["']?(.*?)["']?\)/);
												return match ? match[1] : null;
											})
											.filter(Boolean);
										return { nama, ulasan, rating, foto };
									});
									ulasans.push(data);
								}
								await page.waitForNetworkIdle({ concurrency: 8 });
							}
						} catch (error) {
							console.error(`Gagal memproses ulasan untuk "${nama}". Melanjutkan ke data berikutnya. Error:`, error);
							// Klik tombol kembali untuk kembali ke daftar
							// const backButtons = await page.$$("svg.NMm5M");
							// if (backButtons[1]) {
							// 	await this.repeatClickUntilSuccess(page, backButtons[1]);
							// }
							await page.click(`svg.NMm5M`);
							await page.waitForSelector(`div[jstcache="4"]`, { hidden: true });
							continue; // Lanjutkan ke item berikutnya
						}

						let harga: string = "";
						let deskripsi: string = "";

						try {
							const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
							const config = { responseMimeType: "text/plain" };
							const model = "gemini-2.5-flash-preview-05-20";
							const hargaContents = [
								{
									role: "user",
									parts: [
										{
											text: `Berdasarkan nama tempat "${nama}" dan review berikut: ${ulasans
												.map((u) => u.ulasan)
												.join(" ")}. Jika ini adalah tempat wisata yang memerlukan tiket masuk, berikan estimasi harga tiket untuk 1 orang dalam format string (contoh: "Rp 15.000"). Jika gratis, kembalikan string "Gratis". Jika tidak ada informasi harga yang jelas di review, kembalikan string kosong "". Hanya kembalikan string hasilnya, tanpa penjelasan tambahan.`,
										},
									],
								},
							];
							const hargaResponse = await ai.models.generateContentStream({ model, config, contents: hargaContents });
							let hargaText = "";
							for await (const chunk of hargaResponse) {
								hargaText += chunk.text || "";
							}
							harga = hargaText.trim().replace(/^"|"$/g, "");

							const deskripsiContents = [{ role: "user", parts: [{ text: `Berdasarkan nama tempat "${nama}", alamat "${alamat}", dan review berikut: ${ulasans.map((u) => u.ulasan).join(" ")}. Buatkan deskripsi singkat dan menarik tentang tempat ini dalam 2-3 kalimat yang menggambarkan keunikan dan daya tariknya.` }] }];
							const deskripsiResponse = await ai.models.generateContentStream({ model, config, contents: deskripsiContents });
							for await (const chunk of deskripsiResponse) {
								deskripsi += chunk.text || "";
							}
							deskripsi = deskripsi.trim();
						} catch (error) {
							console.error("Error generating with Gemini:", error);
						}

						// Tambahan pada console.log untuk mencetak juga map_url
						console.log({ nama, alamat, gambar, rating, ulasans, total_ulasan, harga, deskripsi, map_url: page.url() });
						console.log("");

						const match = page.url().match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);

						if (saveToDB) {
							// Tambahan di bagian ini (di dalam if (saveToDB)) — untuk result banyak
							await prisma.maps.upsert({
								where: { nama: nama || "" },
								update: {
									alamat: alamat || "",
									gambar: gambar || "",
									rating: rating || "",
									latitude: parseFloat(match?.[1] || "0"),
									longitude: parseFloat(match?.[2] || "0"),
									map_url: page.url(), // ✅ Tambahan URL Google Maps
									total_ulasan: parseInt(total_ulasan.replace(/[.,]/g, ""), 10),
									harga: harga || "",
									deskripsi: deskripsi || "",
									reviews: {
										create: ulasans.map((u) => ({
											nama: u.nama || "",
											komentar: u.ulasan || "",
											rating: u.rating || "",
										})),
									},
								},
								create: {
									nama: nama || "",
									alamat: alamat || "",
									gambar: gambar || "",
									rating: rating || "",
									latitude: parseFloat(match?.[1] || "0"),
									longitude: parseFloat(match?.[2] || "0"),
									map_url: page.url(), // ✅ Tambahan URL Google Maps
									total_ulasan: parseInt(total_ulasan.replace(/[.,]/g, ""), 10),
									harga: harga || "",
									deskripsi: deskripsi || "",
									reviews: {
										create: ulasans.map((u) => ({
											nama: u.nama || "",
											komentar: u.ulasan || "",
											rating: u.rating || "",
										})),
									},
								},
							});
						}

						const backButtons = await page.$$("svg.NMm5M");
						if (backButtons[1]) {
							await this.repeatClickUntilSuccess(page, backButtons[1]);
						}
						await page.waitForSelector(`div[jstcache="4"]`, { hidden: true });
					}
				}
			} else {
				// Single Result Case
				await page.waitForSelector(`div[jstcache="3"] h1`, { visible: true });
				const nama = await page.$eval(`div[jstcache="3"] h1`, (el) => el.textContent?.trim());

				if (saveToDB && nama) {
					const existingPlace = await prisma.maps.findUnique({ where: { nama: nama } });
					if (existingPlace) {
						console.log(`Tempat "${nama}" sudah ada di database, proses dihentikan.`);
						return;
					}
				}

				const alamat = await page.$eval(`div[jstcache="3"] div.Io6YTe`, (el) => el.textContent?.trim());
				const gambar = await page.$eval(`div[jstcache="3"] img`, (el) => el.getAttribute("src"));
				const total_ulasan = await page.$eval(`div[jstcache="3"] div.TIHn2 .F7nice span span span[aria-label]`, (el) => el.textContent?.match(/\d[\d.,]*/)?.[0] || "");

				let rating;
				let ulasans: any[] = [];

				// PENAMBAHAN: Blok try...catch untuk proses klik tab ulasan
				try {
					await page.evaluate(() => {
						const buttons = Array.from(document.querySelectorAll('div[role="tablist"] > button'));
						const target = buttons.find((btn) => btn.textContent?.trim().toLowerCase() === "ulasan");
						if (target) {
							let attempts = 0;
							const maxAttempts = 10;
							const clickInterval = setInterval(() => {
								attempts++;
								try {
									(target as HTMLElement).click();
									console.log(`Tab ulasan clicked on attempt ${attempts}`);
									clearInterval(clickInterval);
								} catch (error) {
									if (attempts >= maxAttempts) {
										console.log(`Failed to click tab ulasan after ${maxAttempts} attempts`);
										clearInterval(clickInterval);
										throw new Error("Gagal mengklik tab ulasan.");
									}
								}
							}, 1000);
						} else {
							throw new Error("Tombol tab ulasan tidak ditemukan.");
						}
					});
					await page.waitForNetworkIdle({ concurrency: 8 });

					await page.waitForSelector(`div[jstcache="3"] h1`, { hidden: true });
					await page.waitForSelector(`div[data-review-id][jslog]`, { visible: true });

					rating = await page.$eval(`div.fontDisplayLarge`, (el) => el.textContent?.trim());

					for (let i = 1; i <= 2; i++) {
						for (const reviewHandle of await page.$$(`div[data-review-id][jslog]`)) {
							const isProcessed = await reviewHandle.evaluate((el) => el.dataset._done === "1");
							if (isProcessed) continue;
							await reviewHandle.evaluate((el) => (el.dataset._done = "1"));

							await reviewHandle.evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "start" }));
							const expandBtn = await reviewHandle.$(`button[aria-expanded="false"]`);
							if (expandBtn) {
								await this.repeatClickUntilSuccess(page, expandBtn);
							}
							const data = await reviewHandle.evaluate((div) => {
								const nama = div.querySelector(".d4r55")?.textContent?.trim() || null;
								const ulasan = div.querySelector(".MyEned span")?.textContent?.trim() || null;
								const ratingEl = div.querySelector(".kvMYJc");
								const rating = ratingEl?.getAttribute("aria-label")?.match(/\d+/)?.[0] || null;
								const fotoEls = div.querySelectorAll(".Tya61d");
								const foto = Array.from(fotoEls)
									.map((btn) => {
										const style = btn.getAttribute("style") || "";
										const match = style.match(/url\(["']?(.*?)["']?\)/);
										return match ? match[1] : null;
									})
									.filter(Boolean);
								return { nama, ulasan, rating, foto };
							});
							ulasans.push(data);
						}
						await page.waitForNetworkIdle({ concurrency: 8 });
					}
				} catch (error) {
					console.error(`Gagal memproses ulasan untuk "${nama}". Menghentikan proses untuk item ini. Error:`, error);
					return; // Hentikan eksekusi untuk item tunggal yang gagal ini
				}

				let harga: string = "";
				let deskripsi: string = "";

				try {
					const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
					const config = { responseMimeType: "text/plain" };
					const model = "gemini-2.5-flash-preview-05-20";
					const hargaContents = [
						{
							role: "user",
							parts: [
								{
									text: `Berdasarkan nama tempat "${nama}" dan review berikut: ${ulasans
										.map((u) => u.ulasan)
										.join(" ")}. Jika ini adalah tempat wisata yang memerlukan tiket masuk, berikan estimasi harga tiket untuk 1 orang dalam format string (contoh: "Rp 15.000"). Jika gratis, kembalikan string "Gratis". Jika tidak ada informasi harga yang jelas di review, kembalikan string kosong "". Hanya kembalikan string hasilnya, tanpa penjelasan tambahan.`,
								},
							],
						},
					];
					const hargaResponse = await ai.models.generateContentStream({ model, config, contents: hargaContents });
					let hargaText = "";
					for await (const chunk of hargaResponse) {
						hargaText += chunk.text || "";
					}
					harga = hargaText.trim().replace(/^"|"$/g, "");

					const deskripsiContents = [{ role: "user", parts: [{ text: `Berdasarkan nama tempat "${nama}", alamat "${alamat}", dan review berikut: ${ulasans.map((u) => u.ulasan).join(" ")}. Buatkan deskripsi singkat dan menarik tentang tempat ini dalam 2-3 kalimat yang menggambarkan keunikan dan daya tariknya.` }] }];
					const deskripsiResponse = await ai.models.generateContentStream({ model, config, contents: deskripsiContents });
					for await (const chunk of deskripsiResponse) {
						deskripsi += chunk.text || "";
					}
					deskripsi = deskripsi.trim();
				} catch (error) {
					console.error("Error generating with Gemini:", error);
				}

				// Tambahan pada console.log untuk mencetak juga map_url
				console.log({ nama, alamat, gambar, rating, ulasans, total_ulasan, harga, deskripsi, map_url: page.url() });
				console.log("");

				const match = page.url().match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);

				if (saveToDB) {
					// Tambahan di bagian else (single result)
					await prisma.maps.upsert({
						where: { nama: nama || "" },
						update: {
							alamat: alamat || "",
							gambar: gambar || "",
							rating: rating || "",
							latitude: parseFloat(match?.[1] || "0"),
							longitude: parseFloat(match?.[2] || "0"),
							map_url: page.url(), // ✅ Tambahan di sini juga
							total_ulasan: parseInt(total_ulasan.replace(/[.,]/g, ""), 10),
							harga: harga || "",
							deskripsi: deskripsi || "",
							reviews: {
								create: ulasans.map((u) => ({
									nama: u.nama || "",
									komentar: u.ulasan || "",
									rating: u.rating || "",
								})),
							},
						},
						create: {
							nama: nama || "",
							alamat: alamat || "",
							gambar: gambar || "",
							rating: rating || "",
							latitude: parseFloat(match?.[1] || "0"),
							longitude: parseFloat(match?.[2] || "0"),
							map_url: page.url(), // ✅
							total_ulasan: parseInt(total_ulasan.replace(/[.,]/g, ""), 10),
							harga: harga || "",
							deskripsi: deskripsi || "",
							reviews: {
								create: ulasans.map((u) => ({
									nama: u.nama || "",
									komentar: u.ulasan || "",
									rating: u.rating || "",
								})),
							},
						},
					});
				}
			}
		} catch (error) {
			console.error(error);
		} finally {
			if (!page) return;
			await page.close();
		}
	}
}
