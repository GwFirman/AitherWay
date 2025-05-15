import puppeteer, { Browser, Page } from "puppeteer-core";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class GMaps {
	private browser: Browser | null = null;

	constructor() {}

	private async initBrowser(): Promise<Browser> {
		if (this.browser) return this.browser;
		this.browser = await puppeteer.launch({
			executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
			userDataDir: path.join(__dirname, "../", "userData"),
			headless: process.env.NODE_ENV === "production",
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

	public async getDetails(search: string): Promise<void> {
		let page: Page | null = null;

		try {
			const browser = await this.initBrowser();
			page = await browser.newPage();

			await page.setRequestInterception(true);
			page.on("request", (req) => {
				const url = req.url();
				if (url.startsWith("https://www.google.com/maps/vt/pb=")) {
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
						await page.waitForNetworkIdle({ concurrency: 1 });
						await aTag.click();
						await page.waitForNetworkIdle({ concurrency: 1 });
						await page.waitForSelector(`div[jstcache="4"]`, { visible: true });

						await page.waitForSelector(`div[jstcache="4"] h1`, { visible: true });
						const nama = await page.$eval(`div[jstcache="4"] h1`, (el) => el.textContent?.trim());
						await page.waitForSelector(`div[jstcache="4"] div.Io6YTe`, { visible: true });
						const alamat = await page.$eval(`div[jstcache="4"] div.Io6YTe`, (el) => el.textContent?.trim());
						await page.waitForSelector(`div[jstcache="4"] img`, { visible: true });
						const gambar = await page.$eval(`div[jstcache="4"] img`, (el) => el.getAttribute("src"));

						await page.evaluate(() => {
							const buttons = Array.from(document.querySelectorAll('div[role="tablist"] > button'));
							const target = buttons.find((btn) => btn.textContent?.trim().toLowerCase() === "ulasan");
							if (target) (target as HTMLElement).click();
						});
						await page.waitForNetworkIdle({ concurrency: 1 });

						await page.waitForSelector(`div[jstcache="4"] h1`, { hidden: true });
						await page.waitForSelector(`div[data-review-id][jslog]`, { visible: true });

						const rating = await page.$eval(`div.fontDisplayLarge`, (el) => el.textContent?.trim());

						const ulasans: any[] = [];

						for (const reviewHandle of await page.$$(`div[data-review-id][jslog]`)) {
							await reviewHandle.evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "start" }));

							const expandBtn = await reviewHandle.$(`button[aria-expanded="false"]`);
							if (expandBtn) await expandBtn.click();

							// await new Promise((r) => setTimeout(r, 1000));

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

						console.log({ nama, alamat, gambar, rating, ulasans });
						console.log("");

						const match = page.url().match(/@([-.\d]+),([-.\d]+)/);

						await prisma.maps.upsert({
							where: { nama: nama || "" }, // Menentukan kriteria pencarian
							update: {
								alamat: alamat || "",
								gambar: gambar || "",
								rating: rating || "",
								deskripsi: "",
								latitude: parseFloat(match?.[1] || "0"),
								longitude: parseFloat(match?.[2] || "0"),
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
								deskripsi: "",
								latitude: parseFloat(match?.[1] || "0"),
								longitude: parseFloat(match?.[2] || "0"),
								reviews: {
									create: ulasans.map((u) => ({
										nama: u.nama || "",
										komentar: u.ulasan || "",
										rating: u.rating || "",
									})),
								},
							},
						});

						(await page.$$("svg.NMm5M"))[1]?.click();
						await page.waitForSelector(`div[jstcache="4"]`, { hidden: true });
					}
				}
			} else {
				// Handle single result case - extract data similar to the feed case
				await page.waitForSelector(`div[jstcache="3"]`, { visible: true });

				await page.waitForSelector(`div[jstcache="3"] h1`, { visible: true });
				const nama = await page.$eval(`div[jstcache="3"] h1`, (el) => el.textContent?.trim());
				await page.waitForSelector(`div[jstcache="3"] div.Io6YTe`, { visible: true });
				const alamat = await page.$eval(`div[jstcache="3"] div.Io6YTe`, (el) => el.textContent?.trim());
				await page.waitForSelector(`div[jstcache="3"] img`, { visible: true });
				const gambar = await page.$eval(`div[jstcache="3"] img`, (el) => el.getAttribute("src"));

				await page.evaluate(() => {
					const buttons = Array.from(document.querySelectorAll('div[role="tablist"] > button'));
					const target = buttons.find((btn) => btn.textContent?.trim().toLowerCase() === "ulasan");
					if (target) (target as HTMLElement).click();
				});
				await page.waitForNetworkIdle({ concurrency: 1 });

				await page.waitForSelector(`div[jstcache="3"] h1`, { hidden: true });
				await page.waitForSelector(`div[data-review-id][jslog]`, { visible: true });

				const rating = await page.$eval(`div.fontDisplayLarge`, (el) => el.textContent?.trim());

				const ulasans: any[] = [];

				for (const reviewHandle of await page.$$(`div[data-review-id][jslog]`)) {
					await reviewHandle.evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "start" }));

					const expandBtn = await reviewHandle.$(`button[aria-expanded="false"]`);
					if (expandBtn) await expandBtn.click();

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

				console.log({ nama, alamat, gambar, rating, ulasans });
				console.log("");

				const match = page.url().match(/@([-.\d]+),([-.\d]+)/);

				await prisma.maps.upsert({
					where: { nama: nama || "" },
					update: {
						alamat: alamat || "",
						gambar: gambar || "",
						rating: rating || "",
						deskripsi: "",
						latitude: parseFloat(match?.[1] || "0"),
						longitude: parseFloat(match?.[2] || "0"),
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
						deskripsi: "",
						latitude: parseFloat(match?.[1] || "0"),
						longitude: parseFloat(match?.[2] || "0"),
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
		} catch (error) {
			console.error(error);
		} finally {
			if (!page) return;
			await page.close();
		}
	}
}
