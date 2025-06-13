import { create } from "zustand";

export type DestinationTuple = [id: string, nama: string, alamat: string, distance_km: number, deskripsi: string, harga: string, rating: string, total_ulasan: number, gambar: string];

interface ResultState {
	results: { data: DestinationTuple[] };
	setResults: (state: { data: DestinationTuple[] }) => void;
}

export const useResultStore = create<ResultState>((set) => ({
	results: { data: [] },
	setResults: (state) => set({ results: state }),
}));
