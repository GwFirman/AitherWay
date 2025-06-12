import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const q1 = req.nextUrl.searchParams.get("q1");
	const q2 = req.nextUrl.searchParams.get("q2");

	if (!q1 || !q2) {
		return new Response("Parameter q1 dan q2 wajib diisi", { status: 400 });
	}

	// POST ke API eksternal
	const externalRes = await fetch("https://gwfirman-aitherway.hf.space/gradio_api/call/predict", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			data: [q1, q2],
		}),
	});

	const result = await externalRes.json();
	const eventId = result.event_id;

	if (!eventId) {
		return new Response("event_id tidak ditemukan", { status: 500 });
	}

	// GET stream berdasarkan event_id
	const streamRes = await fetch(`https://gwfirman-aitherway.hf.space/gradio_api/call/predict/${eventId}`);
	if (!streamRes.body) {
		return new Response("Tidak ada body dari stream", { status: 500 });
	}

	const reader = streamRes.body.getReader();
	const decoder = new TextDecoder("utf-8");
	const encoder = new TextEncoder();

	const stream = new ReadableStream({
		async start(controller) {
			let buffer = "";

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

			controller.close();
		},
	});

	return new Response(stream, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
		},
	});
}
