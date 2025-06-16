import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parsePrice(priceString: string): string {
	// Pastikan input adalah string yang valid
	if (!priceString || typeof priceString !== "string") {
		return "";
	}

	// Prioritas 1: Cari pola harga "Rp [angka]" menggunakan Regular Expression.
	// Pola ini mencari "Rp" (case-insensitive), diikuti spasi (opsional),
	// lalu diikuti oleh angka dan titik.
	const priceRegex = /Rp\s*[\d\.]+/i;
	const priceMatch = priceString.match(priceRegex);

	if (priceMatch) {
		// Jika pola harga ditemukan, kembalikan hasil yang cocok.
		// priceMatch[0] berisi teks yang cocok, contoh: "Rp 5.000"
		return priceMatch[0] + " IDR";
	}

	// Prioritas 2: Jika tidak ada pola harga, cek kata "Gratis".
	// Menggunakan toLowerCase() agar tidak case-sensitive (mencakup Gratis, gratis, GRaTiS, dll).
	if (priceString.toLowerCase().includes("gratis")) {
		return "Free";
	}

	// Prioritas 3: Jika keduanya tidak ditemukan, kembalikan string kosong.
	return "";
}
