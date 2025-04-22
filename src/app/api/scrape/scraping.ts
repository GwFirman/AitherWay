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

    const alamatSelectors = [
      "button[data-item-id='address']",
      "[data-tooltip='Copy address']",
      "button[aria-label*='address']",
    ];
    const alamat = getTextContent(alamatSelectors);

    const deskripsiSelectors = [
      ".PYvSYb",
      "div[data-attrid='kc:/local:merchant description']",
      "div[aria-label*='Description']",
      ".WeS02d",
    ];
    const deskripsi = getTextContent(deskripsiSelectors);

    const faktaSingkat = Array.from(document.querySelectorAll("span.wEvh0b"))
      .map((el) => el.textContent?.trim())
      .filter(Boolean)
      .join("\n");

    const ratingSelectors = [
      ".skqShb",
      "span[aria-label*='stars']",
      ".MW4etd",
    ];

    const rating = getTextContent(ratingSelectors);

    const alamatLengkapSelectors = [
      ".RcCsl fVHpi w4vB1d NOE9ve M0S7ae AG25L",
      ".DKPXOb OyjIsf",
      "button[data-item-id='address']",
    ];
    const alamatLengkap = getTextContent(alamatLengkapSelectors);

    const gambarUrl =
      document.querySelector("img[decoding='async']")?.getAttribute("src") ||
      "";

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
