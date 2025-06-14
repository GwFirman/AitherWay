import { GoogleGenAI } from "@google/genai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	let processedCount = 0;

	while (true) {
		const data = await prisma.maps.findFirst({
			where: {
				deskripsi: "", //
			},
			include: {
				reviews: true,
			},
		});

		if (!data) {
			console.log(`Selesai! Total data yang diproses: ${processedCount}`);
			break;
		}

		const { nama, alamat } = data;
		const ulasans = data.reviews;
		const reviewText = ulasans.map((u) => u.komentar).join(" ");

		let harga: string = "";
		let deskripsi: string = "";

		try {
			const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
			const config = { responseMimeType: "text/plain" };
			const model = "gemini-2.5-flash-preview-05-20";

			// Generate harga
			const hargaContents = [
				{
					role: "user",
					parts: [
						{
							text: `Berdasarkan nama tempat "${nama}" dan review berikut: ${reviewText}. Jika ini adalah tempat wisata yang memerlukan tiket masuk, berikan estimasi harga tiket untuk 1 orang dalam format string (contoh: "Rp 15.000"). Jika gratis, kembalikan string "Gratis". Jika tidak ada informasi harga yang jelas di review, kembalikan string kosong "". Hanya kembalikan string hasilnya, tanpa penjelasan tambahan.`,
						},
					],
				},
			];
			const hargaResponse = await ai.models.generateContentStream({ model, config, contents: hargaContents });
			for await (const chunk of hargaResponse) {
				harga += chunk.text || "";
			}
			harga = harga.trim().replace(/^"|"$/g, "");

			// Generate deskripsi
			const deskripsiContents = [
				{
					role: "user",
					parts: [
						{
							text: `Berdasarkan nama tempat "${nama}", alamat "${alamat}", dan review berikut: ${reviewText}. Buatkan deskripsi singkat dan menarik tentang tempat ini dalam 2-3 kalimat yang menggambarkan keunikan dan daya tariknya.`,
						},
					],
				},
			];
			const deskripsiResponse = await ai.models.generateContentStream({ model, config, contents: deskripsiContents });
			for await (const chunk of deskripsiResponse) {
				deskripsi += chunk.text || "";
			}
			deskripsi = deskripsi.trim();

			// Update database
			await prisma.maps.update({
				where: { id: data.id },
				data: {
					harga: harga,
					deskripsi: deskripsi,
				},
			});

			processedCount++;
			console.log(`[${processedCount}] Updated: ${nama}`);
			console.log(`Harga: ${harga}`);
			console.log(`Deskripsi: ${deskripsi}`);
			console.log("---");
		} catch (error) {
			console.error(`Error processing ${nama}:`, error);
			if (!(error instanceof Error)) return;

			// Check if it's a rate limit error (429)
			if (error.message && error.message.includes("429")) {
				console.log(`Rate limit exceeded. Waiting 25 seconds before retrying...`);
				await new Promise((resolve) => setTimeout(resolve, 25000));
				console.log(`Retrying ${nama}...`);
				continue; // Retry the same data
			} else {
				console.log(`Proses dihentikan karena error pada data: ${nama}`);
				break;
			}
		}
	}
}
main();
