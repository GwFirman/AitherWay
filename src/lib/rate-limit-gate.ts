import { auth } from "@/auth"; // Sesuaikan dengan path auth Anda
import { headers } from "next/headers";
import { checkUserApiLimit, incrementUserApiLimit } from "./api-limit";
import { checkAndIncrementGuestLimit } from "./guest-limit";

/**
 * Fungsi helper untuk membuat objek Error dengan nama spesifik.
 * Ini adalah pengganti dari custom class.
 * @param message Pesan error yang akan ditampilkan.
 * @returns Objek Error yang sudah dikustomisasi.
 */
function createRateLimitError(message: string): Error {
	const error = new Error(message);
	// Kita set 'name' sebagai penanda unik untuk error tipe ini.
	// Ini yang akan kita gunakan untuk mendeteksinya di blok 'catch'.
	error.name = "RateLimitError";
	return error;
}

/**
 * Fungsi ini memeriksa dan memberlakukan rate limit.
 * Jika limit terlampaui, fungsi ini akan melempar Error dengan nama 'RateLimitError'.
 * Jika tidak, fungsi akan selesai tanpa return value, dan eksekusi kode bisa berlanjut.
 */
export async function enforceRateLimit() {
	const session = await auth();
	const userId = session?.user?.id;

	// Kasus 1: User Sudah Login
	if (userId) {
		const hasLimit = await checkUserApiLimit(userId);
		if (!hasLimit) {
			// Gunakan fungsi helper kita untuk melempar error
			throw createRateLimitError("Limit harian untuk user telah habis.");
		}
		await incrementUserApiLimit(userId);
		return; // Limit aman, lanjutkan
	}

	// Kasus 2: User Belum Login (Guest)
	if (!userId) {
		const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
		const isAllowed = await checkAndIncrementGuestLimit(ip);
		if (!isAllowed) {
			// Gunakan fungsi helper kita untuk melempar error
			throw createRateLimitError("Limit untuk guest telah habis. Silakan login.");
		}
		return; // Limit aman, lanjutkan
	}
}
