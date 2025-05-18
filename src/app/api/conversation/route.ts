import { GoogleGenAI } from "@google/genai";
import { PrismaClient } from "@prisma/client";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const prisma = new PrismaClient();

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const R = 6371; // Radius bumi dalam km
	const dLat = (lat2 - lat1) * (Math.PI / 180);
	const dLon = (lon2 - lon1) * (Math.PI / 180);
	const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
}

async function tokenizePrompt(prompt: string): Promise<string[]> {
	const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
	const text = `Extract the most relevant keywords from the following sentence: "${prompt}". 
                  Provide them as a JSON array without extra text.`;

	const contents = [{ role: "user", parts: [{ text }] }];
	const response = await ai.models.generateContent({ model: "gemini-2.0-flash-lite", contents });

	try {
		const jsonMatch = response.text?.match(/\[.*?\]/);
		return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
	} catch (error) {
		console.error("Error parsing Gemini response:", error);
		return [];
	}
}

async function searchDestinationsByLocation(keywords: string[], latitude: number, longitude: number): Promise<any[]> {
	const orConditions = keywords.flatMap((keyword) => [
		{ nama: { contains: keyword, mode: "insensitive" as const } }, //
		{ deskripsi: { contains: keyword, mode: "insensitive" as const } },
		{ alamat: { contains: keyword, mode: "insensitive" as const } },
	]);

	const destinations = await prisma.maps.findMany({
		where: { OR: orConditions },
		take: 5,
	});

	return destinations.map((dest) => ({
		...dest,
		distance: calculateDistance(latitude, longitude, dest.latitude, dest.longitude).toFixed(2) + " km",
	}));
}

async function processDestinations(destinations: any[], writer: WritableStreamDefaultWriter, prompt: string, encoder: TextEncoder) {
	const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

	await writer.write(encoder.encode(`data: {"status": "Searching destinations..."}\n\n`));

	for (const destination of destinations) {
		const text = `
          Based on the following information about ${destination.nama}:
          Original description: ${destination.deskripsi || "No description available"}
          Location: ${destination.alamat || "Unknown location"}
          Distance from user: ${destination.distance}
          
          1. Provide an engaging 2-3 sentence description of this destination.
          2. Give it a rating out of 5 stars.
          3. Mention why someone might want to visit based on this prompt: "${prompt}"
          
          Format your response as JSON with keys 'description', 'rating', and 'relevance'.
        `;

		const contents = [{ role: "user", parts: [{ text }] }];
		const response = await ai.models.generateContentStream({ model: "gemini-2.0-flash-lite", contents });

		let fullResponse = "";
		for await (const chunk of response) {
			fullResponse += chunk.text;
		}

		let enhancedData;
		try {
			const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
			enhancedData = jsonMatch ? JSON.parse(jsonMatch[0]) : { description: fullResponse.substring(0, 200) + "..." };
		} catch (e) {
			enhancedData = { description: "A popular destination worth exploring!" };
		}

		const resultObject = {
			id: destination.id,
			name: destination.nama,
			description: enhancedData.description || destination.deskripsi,
			rating: enhancedData.rating || "4.0",
			relevance: enhancedData.relevance || "Relevant to search",
			address: destination.alamat,
			image: destination.gambar,
			distance: destination.distance,
			coordinates: { longitude: destination.longitude, latitude: destination.latitude },
		};

		await writer.write(encoder.encode(`data: ${JSON.stringify(resultObject)}\n\n`));
		await new Promise((resolve) => setTimeout(resolve, 300));
	}

	await writer.write(encoder.encode(`data: {"status": "Search completed"}\n\n`));
	await writer.close();
}

export const POST = async (req: Request) => {
	try {
		const { prompt, latitude, longitude } = await req.json();

		if (!prompt || typeof prompt !== "string") {
			return new Response(JSON.stringify({ error: "Prompt is required" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		if (!latitude || !longitude) {
			return new Response(JSON.stringify({ error: "Coordinates are required" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		const keywords = await tokenizePrompt(prompt);
		const destinations = await searchDestinationsByLocation(keywords, latitude, longitude);

		if (destinations.length === 0) {
			return new Response(JSON.stringify({ message: "No destinations found matching your criteria" }), {
				headers: { "Content-Type": "application/json" },
			});
		}

		const encoder = new TextEncoder();
		const stream = new TransformStream();
		const writer = stream.writable.getWriter();

		const response = new Response(stream.readable, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
			},
		});

		processDestinations(destinations, writer, prompt, encoder);
		return response;
	} catch (error) {
		console.error("Error processing request:", error);
		return new Response(JSON.stringify({ error: "Failed to process request" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
