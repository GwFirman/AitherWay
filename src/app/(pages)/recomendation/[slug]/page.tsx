"use client";

import axios from "axios";
import ReviewSection from "./components/ReviewTravel";
import HeroSection from "./components/HeroDetailTravel";
import DetailPlace from "./components/DetailPlaceTravel";
import { useEffect, useState } from "react";
import { Maps, Reviews } from "@prisma/client";
import { useParams } from "next/navigation";
import ListOtherPlace from "./components/ListOtherPlace";

export default function RecomendationDetailPage() {
	const params = useParams<{ slug: string }>();
	const { slug } = params;

	// State untuk data, loading, dan error
	const [data, setData] = useState<Maps | null>(null);
	const [reviews, setReviews] = useState<Reviews[]>([]);
	const [loading, setLoading] = useState(true); // Mulai dengan state loading
	const [error, setError] = useState<string | null>(null); // State untuk pesan error

	useEffect(() => {
		if (!slug) {
			setLoading(false);
			return;
		}

		// Reset state setiap kali slug berubah
		setLoading(true);
		setError(null);

		(async () => {
			try {
				// Menggunakan Promise.all untuk mengambil data secara paralel
				const [dataResponse, reviewsResponse] = await Promise.all([axios.get<Maps>(`/api/recomendation/${slug}`), axios.get<Reviews[]>(`/api/recomendation/reviews/${slug}`)]);

				if (dataResponse.data) {
					setData(dataResponse.data);
					setReviews(reviewsResponse.data);
				} else {
					// Jika data utama tidak ada, anggap sebagai error "tidak ditemukan"
					setError("Data tidak ditemukan.");
				}
			} catch (err) {
				console.error("Failed to fetch data:", err);
				setError("Gagal memuat data. Silakan coba lagi nanti.");
			} finally {
				// Hentikan loading setelah selesai (baik sukses maupun gagal)
				setLoading(false);
			}
		})();
	}, [slug]);

	// 1. Tampilkan state Loading
	if (loading) {
		return (
			<div className="mx-auto flex min-h-screen max-w-7xl animate-pulse flex-col gap-8 p-4 py-20 md:p-8">
				{/* Hero Skeleton */}
				<div className="h-64 w-full rounded-lg bg-gray-300 md:h-96"></div>
				{/* Detail Skeleton */}
				<div className="flex flex-col gap-4">
					<div className="h-8 w-3/4 rounded-md bg-gray-300"></div>
					<div className="h-5 w-full rounded-md bg-gray-300"></div>
					<div className="h-5 w-5/6 rounded-md bg-gray-300"></div>
				</div>
				{/* Review Skeleton */}
				<div className="mt-8">
					<div className="h-7 w-1/3 rounded-md bg-gray-300"></div>
					<div className="mt-4 h-24 w-full rounded-lg bg-gray-300"></div>
				</div>
			</div>
		);
	}

	// 2. Tampilkan state Error (termasuk jika data tidak ditemukan)
	if (error) {
		return (
			<div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center">
				<h1 className="text-2xl font-bold text-red-600">Terjadi Kesalahan</h1>
				<p className="mt-2 text-gray-600">{error}</p>
			</div>
		);
	}

	// 3. Tampilkan jika data null setelah loading selesai dan tidak ada error (kasus slug tidak valid)
	if (!data) {
		return (
			<div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center">
				<h1 className="text-2xl font-bold text-gray-900">Data Tidak Ditemukan</h1>
				<p className="mt-2 text-gray-600">Tempat wisata yang Anda cari tidak tersedia.</p>
			</div>
		);
	}

	// 4. Tampilkan konten utama jika data berhasil dimuat
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="py-20">
				<HeroSection data={data} />
				<DetailPlace data={data} />
				<ReviewSection reviews={reviews} />
				<ListOtherPlace />
			</div>
		</div>
	);
}
