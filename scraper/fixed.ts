import { GoogleGenAI } from "@google/genai";
import { PrismaClient } from "@prisma/client";
import { sleep } from "../utils/sleep";

const prisma = new PrismaClient();
const RETRY_DELAY = 25_000;
const MAX_RETRY = 10;

async function generateContentWithRetry(ai: GoogleGenAI, model: string, config: any, contents: any[], label: string) {
	let retry = 0;
	while (true) {
		try {
			let result = "";
			const response = await ai.models.generateContentStream({ model, config, contents });
			for await (const chunk of response) {
				result += chunk.text || "";
			}
			return result.trim().replace(/^"|"$/g, "");
		} catch (err: any) {
			if (err instanceof Error && (err.message.includes("429") || err.message.includes("quota"))) {
				retry++;
				if (retry > MAX_RETRY) throw new Error(`Max retry exceeded for ${label}`);
				console.warn(`Rate limited on ${label}. Waiting before retry...`);
				await sleep(RETRY_DELAY);
			} else {
				throw err;
			}
		}
	}
}

function fallbackDeskripsi(nama: string, alamat: string, reviews: string[]): string {
	let deskripsi = `Tempat ${nama} yang terletak di ${alamat} mendapatkan ulasan seperti: `;
	if (reviews.length === 0) return "";
	deskripsi += reviews
		.slice(0, 2)
		.map((r) => `"${r}"`)
		.join(" ");
	return deskripsi;
}

async function main() {
	let processedCount = 0;
	const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
	const config = { responseMimeType: "text/plain" };
	const model = "gemini-2.5-flash-preview-05-20";

	while (true) {
		const data = await prisma.maps.findFirst({
			where: { deskripsi: "" },
			include: { reviews: true },
		});

		if (!data) {
			console.log(`Selesai! Total data yang diproses: ${processedCount}`);
			break;
		}

		const { nama, alamat } = data;
		const ulasans = data.reviews;
		const reviewText = ulasans.map((u) => u.komentar).join(" ");
		const reviewList = ulasans.map((u) => u.komentar);

		let harga: string = "";
		let deskripsi: string = "";

		try {
			// Gabung jadi satu prompt
			const gabunganPrompt = [
				{
					role: "user",
					parts: [
						{
							text: `Berdasarkan nama tempat "${nama}", alamat "${alamat}", dan review berikut: ${reviewText}
1. Estimasi harga tiket masuk untuk 1 orang (misal: "Rp 15.000" atau "Gratis").
2. Buat deskripsi singkat (2-3 kalimat) yang menarik.

Jawab dalam format:
Harga: ...
Deskripsi: ...`,
						},
					],
				},
			];

			let aiResult = "";
			try {
				aiResult = await generateContentWithRetry(ai, model, config, gabunganPrompt, "harga+deskripsi");
			} catch (e) {
				console.warn("AI gagal, fallback manual.");
			}

			if (aiResult) {
				// Parsing hasil
				const hargaMatch = aiResult.match(/Harga:\s*(.*)/i);
				const deskripsiMatch = aiResult.match(/Deskripsi:\s*([\s\S]*)/i);
				harga = hargaMatch ? hargaMatch[1].split("\n")[0].trim() : "";
				deskripsi = deskripsiMatch ? deskripsiMatch[1].trim() : "";
			}

			// Fallback jika ada yang kosong
			if (!harga) {
				harga = ""; // atau logic lain sesuai kebutuhan
			}
			if (!deskripsi) {
				deskripsi = fallbackDeskripsi(nama, alamat, reviewList);
				console.warn("Deskripsi diisi dari review karena AI limit/gagal.");
			}

			await prisma.maps.update({
				where: { id: data.id },
				data: {
					harga,
					deskripsi,
				},
			});

			processedCount++;
			console.log(`[${processedCount}] Updated: ${nama}`);
			console.log(`Harga: ${harga}`);
			console.log(`Deskripsi: ${deskripsi}`);
			console.log("---");
		} catch (error) {
			console.error(`Error processing ${nama}:`, error);
			console.log(`Proses dihentikan karena error pada data: ${nama}`);
			break;
		}
	}
}

main();
