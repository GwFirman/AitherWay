import puppeteer from "puppeteer-core";

async function scrapGoogleMaps(lokasi: string) {
	console.log("Membuka browser...");
	const browser = await puppeteer.launch({
		executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
		headless: false,
		defaultViewport: null,
	});

	const page = await browser.newPage();

	await page.goto("https://www.google.com/maps");
	await page.waitForSelector("input[name='q']");
	await page.type("input[name='q']", lokasi);
	await page.keyboard.press("Enter");

	await page.waitForNavigation({ waitUntil: "networkidle2" }).catch(() => {
		console.log("Request timeout");
	});

	await new Promise((resolve) => setTimeout(resolve, 3000));

	const hasil = await page.evaluate(() => {
		const getTextContent = (selectors: string[]): string => {
			for (const selector of selectors) {
				const element = document.querySelector(selector);
				if (element && element.textContent) {
					return element.textContent.trim();
				}
			}
			return "";
		};

		const nama = document.querySelector("h1")?.textContent || "";

		const alamatSelectors = ["button[data-item-id='address']", "[data-tooltip='Copy address']", "button[aria-label*='address']"];
		const alamat = getTextContent(alamatSelectors);

		const deskripsiSelectors = [".PYvSYb", "div[data-attrid='kc:/local:merchant description']", "div[aria-label*='Description']", ".WeS02d"];
		const deskripsi = getTextContent(deskripsiSelectors);

		const faktaSingkat = Array.from(document.querySelectorAll("span.wEvh0b"))
			.map((el) => el.textContent?.trim())
			.filter(Boolean)
			.join("\n");

		const ratingSelectors = [".skqShb", "span[aria-label*='stars']", ".MW4etd"];

		const rating = getTextContent(ratingSelectors);

		const alamatLengkapSelectors = [".RcCsl fVHpi w4vB1d NOE9ve M0S7ae AG25L", ".DKPXOb OyjIsf", "button[data-item-id='address']"];
		const alamatLengkap = getTextContent(alamatLengkapSelectors);

		const gambarUrl = document.querySelector("img[decoding='async']")?.getAttribute("src") || "";

		return { nama, alamat, deskripsi, gambarUrl, faktaSingkat, alamatLengkap, rating };
	});

	console.log(`Nama: ${hasil.nama}`);
	console.log(`Rating: ${hasil.rating}`);
	console.log(`Deskripsi: ${hasil.deskripsi}`);
	console.log(`Fakta Singkat: ${hasil.faktaSingkat}`);
	console.log(`Alamat: ${hasil.alamat}`);
	console.log(`Gambar URL: ${hasil.gambarUrl}`);

	//   await browser.close();
}

const lokasiPencarian = "Kantor Pusat Google Indonesia, Jakarta Selatan";
scrapGoogleMaps(lokasiPencarian).catch((error) => {
	console.error("Terjadi kesalahan:", error);
});

import path from "path";
import puppeteer, { Browser } from "puppeteer-core";

export default class GMaps {
	public browser: Browser | null = null;

	public async initBrowser() {
		if (this.browser) return;
		this.browser = await puppeteer.launch({
			executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
			userDataDir: path.join(__dirname, "../", "userData"),
			headless: false,

			args: ["--no-sandbox", "--disable-setuid-sandbox", '--disable-blink-features="AutomationControlled"'],
		});
	}

	public async getDetails(lat: string, lng: string) {
		if (!this.browser) return;
		let result = {
			name: "",
		};

		const page = (await this.browser.pages())[0];
		if (!page) return;
		await page.setViewport({ width: 1280, height: 800 });
		await page.goto("https://www.google.com/maps");
		await page.type("input[name='q']", "pantai");
		await page.keyboard.press("Enter");
		await page.waitForSelector(`div[jstcache="3"]`, { visible: true });
		let html = await page.$eval("h1", (el) => el.textContent);
		console.log("nama: ", html);
		result.name = html || "";
		html = await page.$eval(`img[decoding="async"]`, (el) => el.getAttribute("src"));
		console.log("gambar: ", html);

		// await this.browser.close();
	}
}
