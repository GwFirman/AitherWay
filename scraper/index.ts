import GMaps from "../lib/gMaps";

async function main() {
	const gMapsInstance = new GMaps();
	// Jadikan true kalau mau save ke Database
	const saveToDB = true;

	const categories = ["gunung", "pantai", "pulau", "air terjun", "danau", "sungai", "gua", "hutan", "lembah", "perbukitan", "taman nasional"];

	const provinces = [
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
		"maluku",
		"maluku utara",
		"papua",
		"papua barat",
		"papua pegunungan",
	];

	// Daftar API keys untuk digunakan dalam round-robin
	const apiKeys = ["API_KEY_1", "API_KEY_2", "API_KEY_3", "API_KEY_4"];

	let currentKeyIndex = 0;

	// Fungsi untuk mendapatkan API key berikutnya menggunakan round-robin
	function getNextApiKey() {
		const apiKey = apiKeys[currentKeyIndex];
		currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
		return apiKey;
	}

	for (const prov of provinces) {
		for (const cat of categories) {
			const query = `${cat} di ${prov}`;
			const apikey = getNextApiKey(); // Ambil API key secara bergantian
			await gMapsInstance.getDetails(query, saveToDB, apikey);
		}
	}
	console.log("sudah done");
}

main();
