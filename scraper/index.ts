import GMaps from "../lib/gMaps";

// ==========================================
// CONFIGURATION - Edit here!
// ==========================================

const CONFIG = {
	// Save to database?
	saveToDB: true,

	// Generate AI content?
	generateHarga: false, // Set to false to skip price estimation
	generateDeskripsi: true, // Set to false to skip description generation

	// Categories to search
	categories: [
		"gunung", // Mountain
		"pantai", // Beach
		"pulau", // Island
		"air terjun", // Waterfall
		"danau", // Lake
		"sungai", // River
		"gua", // Cave
		"hutan", // Forest
		"lembah", // Valley
		"perbukitan", // Hills
		"taman nasional", // National Park
	],

	// Provinces in Indonesia
	provinces: [
		"jakarta",
		"banten",
		"jawa barat",
		"jawa tengah",
		"yogyakarta",
		"jawa timur",
		"aceh",
		"sumatera utara",
		"sumatera barat",
		"riau",
		"kepulauan riau",
		"jambi",
		"bengkulu",
		"sumatera selatan",
		"bangka belitung",
		"lampung",
		"bali",
		"nusa tenggara barat",
		"nusa tenggara timur",
		"kalimantan barat",
		"kalimantan tengah",
		"kalimantan selatan",
		"kalimantan timur",
		"kalimantan utara",
		"sulawesi utara",
		"sulawesi tengah",
		"sulawesi selatan",
		"sulawesi tenggara",
		"gorontalo",
		"sulawesi barat",
		"maluku",
		"maluku utara",
		"papua",
		"papua barat",
		"papua tengah",
		"papua pegunungan",
		"papua selatan",
		"papua barat daya",
	],
};

// ==========================================
// AI PROMPT TEMPLATES - Customize prompts here!
// ==========================================

export const AI_PROMPTS = {
	// Prompt for price estimation
	harga: (nama: string, reviews: string) =>
		`Berdasarkan nama tempat "${nama}" dan review berikut: ${reviews}. Jika ini adalah tempat wisata yang memerlukan tiket masuk, berikan estimasi harga tiket untuk 1 orang dalam format string (contoh: "Rp 15.000"). Jika gratis, kembalikan string "Gratis". Jika tidak ada informasi harga yang jelas di review, kembalikan string kosong "". Hanya kembalikan string hasilnya, tanpa penjelasan tambahan.`,

	// Prompt for description generation
	deskripsi: (nama: string, alamat: string, reviews: string) => `Berdasarkan nama tempat "${nama}", alamat "${alamat}", dan review berikut: ${reviews}. Buatkan deskripsi singkat dan menarik tentang tempat ini dalam 2-3 kalimat yang menggambarkan keunikan dan daya tariknya.`,
};

// ==========================================
// GEMINI AI CONFIG
// ==========================================

export const GEMINI_CONFIG = {
	model: "gemini-2.5-flash-preview-05-20",
	responseMimeType: "text/plain",
	retryDelay: 25000, // 25 seconds for rate limit
};

// ==========================================
// MAIN SCRAPER
// ==========================================

async function main() {
	// Auto-detect all GEMINI_API_KEY_* environment variables
	const apiKeys = Object.keys(process.env)
		.filter((key) => key.startsWith("GEMINI_API_KEY_"))
		.sort() // Sort to maintain consistent order (GEMINI_API_KEY_1, _2, _3, etc.)
		.map((key) => process.env[key])
		.filter(Boolean) as string[];

	if (apiKeys.length === 0) {
		console.error("❌ No API keys found in environment variables!");
		console.error("Please set GEMINI_API_KEY_1, GEMINI_API_KEY_2, etc. in .env.local");
		process.exit(1);
	}

	console.log(
		`🔑 Auto-detected API keys: ${Object.keys(process.env)
			.filter((k) => k.startsWith("GEMINI_API_KEY_"))
			.sort()
			.join(", ")}`,
	);

	// Round-robin API key selector
	let keyIndex = 0;
	const getNextApiKey = () => {
		const key = apiKeys[keyIndex];
		keyIndex = (keyIndex + 1) % apiKeys.length;
		return key;
	};

	// Initialize scraper
	const scraper = new GMaps();

	// Show configuration
	console.log("=".repeat(50));
	console.log("🚀 SCRAPER STARTED");
	console.log("=".repeat(50));
	console.log(`✅ API Keys Loaded: ${apiKeys.length}`);
	console.log(`💾 Save to DB: ${CONFIG.saveToDB}`);
	console.log(`💰 Generate Harga: ${CONFIG.generateHarga}`);
	console.log(`📝 Generate Deskripsi: ${CONFIG.generateDeskripsi}`);
	console.log(`🔍 Categories: ${CONFIG.categories.length}`);
	console.log(`📍 Provinces: ${CONFIG.provinces.length}`);
	console.log(`📊 Total Queries: ${CONFIG.categories.length * CONFIG.provinces.length}`);
	console.log("=".repeat(50));
	console.log("");

	// Loop through provinces and categories
	let queryCount = 0;
	for (const province of CONFIG.provinces) {
		for (const category of CONFIG.categories) {
			queryCount++;
			const query = `${category} di ${province}`;
			const apiKey = getNextApiKey();

			console.log(`[${queryCount}/${CONFIG.categories.length * CONFIG.provinces.length}] 🔍 Searching: ${query}`);

			await scraper.getDetails(query, CONFIG.saveToDB, apiKey);
		}
	}

	console.log("\n" + "=".repeat(50));
	console.log("✅ SCRAPING COMPLETED!");
	console.log("=".repeat(50));
}

// Run scraper
main().catch((error) => {
	console.error("\n❌ FATAL ERROR:", error);
	process.exit(1);
});
