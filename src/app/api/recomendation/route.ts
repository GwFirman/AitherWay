import { NextRequest } from "next/server";

// Array URL untuk load balancing
const API_URLS = [
	"https://gwfirman-aitherway.hf.space/gradio_api/call/predict", //
	"https://gwfirman-aitherway2.hf.space/gradio_api/call/predict",
	"https://gwfirman-aitherway3.hf.space/gradio_api/call/predict",
	"https://gwfirman-aitherway4.hf.space/gradio_api/call/predict",
];

// Fungsi untuk memilih URL secara random (alternatif round robin untuk serverless)
function getRandomApiUrl() {
	const randomIndex = Math.floor(Math.random() * API_URLS.length);
	return API_URLS[randomIndex];
}

// Atau gunakan hash dari parameter untuk konsistensi per request
function getHashBasedApiUrl(q1: string, q2: string) {
	const hash = (q1 + q2).split("").reduce((a, b) => {
		a = (a << 5) - a + b.charCodeAt(0);
		return a & a;
	}, 0);
	const index = Math.abs(hash) % API_URLS.length;
	return API_URLS[index];
}

// Atau gunakan timestamp untuk distribusi yang lebih merata
function getTimeBasedApiUrl() {
	const index = Math.floor(Date.now() / 1000) % API_URLS.length;
	return API_URLS[index];
}

export async function GET(req: NextRequest) {
	const q1 = req.nextUrl.searchParams.get("q1");
	const q2 = req.nextUrl.searchParams.get("q2");

	if (!q1 || !q2) {
		return new Response("Parameter q1 dan q2 wajib diisi", { status: 400 });
	}

	// Pilih salah satu strategi load balancing:
	// 1. Random (sederhana dan efektif untuk serverless)
	// const apiUrl = getRandomApiUrl();

	// 2. Hash-based (konsisten untuk kombinasi parameter yang sama)
	const apiUrl = getHashBasedApiUrl(q1, q2);

	// 3. Time-based (distribusi berdasarkan waktu)
	// const apiUrl = getTimeBasedApiUrl();

	try {
		// POST ke API eksternal
		const externalRes = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				data: [q1, q2],
			}),
		});

		if (!externalRes.ok) {
			throw new Error(`API responded with status: ${externalRes.status}`);
		}

		const result = await externalRes.json();
		const eventId = result.event_id;

		if (!eventId) {
			return new Response("event_id tidak ditemukan", { status: 500 });
		}

		// Ekstrak base URL untuk stream
		const baseUrl = apiUrl.replace("/call/predict", "");

		// GET stream berdasarkan event_id
		const streamRes = await fetch(`${baseUrl}/call/predict/${eventId}`);
		if (!streamRes.body) {
			return new Response("Tidak ada body dari stream", { status: 500 });
		}

		const reader = streamRes.body.getReader();
		const decoder = new TextDecoder("utf-8");
		const encoder = new TextEncoder();

		const stream = new ReadableStream({
			async start(controller) {
				let buffer = "";

				try {
					while (true) {
						const { done, value } = await reader.read();
						if (done) break;

						buffer += decoder.decode(value, { stream: true });

						const parts = buffer.split("\n\n");
						buffer = parts.pop() || "";

						for (const part of parts) {
							const lines = part.split("\n");
							const dataLine = lines.find((line) => line.startsWith("data:"));
							if (dataLine) {
								const data = dataLine.replace(/^data:\s*/, "");
								controller.enqueue(encoder.encode(`data: ${data}\n\n`));
							}
						}
					}
				} catch (error) {
					controller.error(error);
				} finally {
					controller.close();
				}
			},
		});

		return new Response(stream, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
			},
		});
	} catch (error) {
		console.error("Error:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
