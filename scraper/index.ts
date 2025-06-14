import GMaps from "../lib/gMaps";

async function main() {
	const gMapsInstance = new GMaps();
	// Jadikan true kalo mau save ke Database
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

	for (const prov of provinces) {
		for (const cat of categories) {
			const query = `${cat} ${cat} di ${prov}`;
			await gMapsInstance.getDetails(query, saveToDB);
		}
	}
	console.log("sudah done");
}
main();
