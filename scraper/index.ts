import GMaps from "../lib/gMaps";

async function main() {
	const gMapsInstance = new GMaps();
	// Jadikan true kalo mau save ke Database
	const saveToDB = false;
	await gMapsInstance.getDetails("gunung", saveToDB);
	console.log("sudah done");
}
main();
