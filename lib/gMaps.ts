import puppeteer, { Browser } from "puppeteer-core";
import path from "path";

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
			args: ["--no-sandbox", "--disable-setuid-sandbox", '--disable-blink-features="AutomationControlled"'],
		});
		return this.browser;
	}

	public async getDetails(lat: string, lng: string): Promise<void> {
		try {
			this.browser = await this.initBrowser();
			const page = await this.browser.newPage();

			await page.goto("https://www.google.com/maps");
			await page.type("input[name='q']", "pantai manado");
			await page.keyboard.press("Enter");
			await page.waitForSelector(`div[jstcache="3"]`, { visible: true });

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

			await page.close();
		} catch (error) {
			console.error("Error in getDetails:", error);
		}
	}
}

(async () => {
	const gMapsInstance = new GMaps();
	await gMapsInstance.getDetails("-6.226013", "106.818897"); // Example lat and lng
})();
