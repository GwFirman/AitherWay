"use client";

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useResultStore, DestinationTuple } from "@/store/useResultStore";

const SearchContext = createContext<{
	query?: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	results: { data: DestinationTuple[] };
	setResults: (state: { data: DestinationTuple[] }) => void;
	fetchRecommendations: (search: string, from: string) => Promise<void>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	location?: string | null;
	error: string;
	coordinates: { lat: number; lng: number } | null;
}>({
	setQuery: () => {},
	results: { data: [] },
	setResults: () => {},
	fetchRecommendations: async () => {},
	isLoading: false,
	setIsLoading: () => {},
	coordinates: null,
	error: "",
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [location, setLocation] = useState<string | null>("Sedang mengambil lokasi...");
	const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
	const [error, setError] = useState("");
	const { results, setResults } = useResultStore();

	const fetchRecommendations = async (search: string, from: string) => {
		try {
			// setResults({ data: [] });
			setIsLoading(true);
			setError("");
			const queryParams = new URLSearchParams();
			queryParams.append("q1", search);
			queryParams.append("q2", from);

			const response = await fetch(`/api/recomendation?${queryParams.toString()}`);
			if (!response.ok) {
				console.warn("Gagal memuat data rekomendasi. Status:", response.status);
				setError((await response.text()) || "Terjadi kesalahan saat memuat rekomendasi. Silakan coba lagi nanti.");
				return;
			}

			if (!response.body) {
				console.warn("Respons kosong dari server.");
				setError("Data tidak ditemukan. Coba kata kunci lain.");
				return;
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder("utf-8");
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
						try {
							const data = dataLine.replace(/^data:\s*/, "");
							const parsedData = JSON.parse(data) as { data: DestinationTuple[] };
							if (Array.isArray(parsedData) && parsedData.length > 1) {
								setResults(parsedData[1]);
							}
						} catch (parseError) {
							console.error("Gagal mengurai data:", parseError);
							setError("Terjadi kesalahan dalam memproses data.");
						}
					}
				}
			}
		} catch (error) {
			console.error("Terjadi kesalahan saat mengambil rekomendasi:", error);
			setError("Gagal mengambil data. Pastikan koneksi internet stabil.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const getLocation = () => {
			if (!navigator.geolocation) {
				setLocation("Peramban tidak mendukung geolokasi.");
				return;
			}

			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
					setCoordinates({ lat: latitude, lng: longitude });
				},
				(_error) => {
					setLocation("Gagal mengakses lokasi.");
					console.warn("Akses lokasi ditolak atau gagal.");
				},
				{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
			);
		};

		getLocation();
	}, []);

	useEffect(() => {
		if (!coordinates) return;

		const fetchLocation = async () => {
			try {
				const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coordinates.lat}&lon=${coordinates.lng}&format=json`);
				if (!response.ok) {
					console.warn("Gagal mendapatkan lokasi dari koordinat.");
					setLocation("Tidak dapat menemukan lokasi.");
					return;
				}
				const data = await response.json();
				setLocation(data.display_name || "Lokasi tidak ditemukan");
			} catch (error) {
				console.error("Gagal mengambil lokasi:", error);
				setLocation("Terjadi kesalahan saat mengambil lokasi.");
			}
		};

		fetchLocation();
	}, [coordinates]);

	return (
		<SearchContext.Provider
			value={{
				query,
				setQuery,
				results,
				setResults,
				fetchRecommendations,
				isLoading,
				setIsLoading,
				location,
				coordinates,
				error,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
}

export function useSearch() {
	return useContext(SearchContext);
}
