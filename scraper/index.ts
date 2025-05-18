import GMaps from "../lib/gMaps";

async function main() {
	const gMapsInstance = new GMaps();
	await gMapsInstance.getDetails("pantai cilacap");
	console.log("sudah done");
}
main();
