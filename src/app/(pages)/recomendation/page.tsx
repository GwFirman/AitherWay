"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { MapPin, Loader2, AlertCircleIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCircle, FaRegCircle, FaAdjust } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "../../../contexts/SearchContext";
import slug from "slug";
import { useSearchParams } from "next/navigation";
import { parsePrice } from "@/lib/utils";

function renderCircles(rating: number) {
	const circles = [];

	for (let i = 1; i <= 5; i++) {
		const diff = rating - (i - 1);

		if (diff >= 1) {
			circles.push(<FaCircle key={i} className="size-4 text-rose-500" />);
		} else if (diff >= 0.25 && diff <= 0.75) {
			circles.push(<FaAdjust key={i} className="size-4 text-rose-500" />);
		} else if (diff > 0) {
			circles.push(<FaAdjust key={i} className="size-4 text-rose-500 opacity-70" />);
		} else {
			circles.push(<FaRegCircle key={i} className="text-rose-500" size={18} />);
		}
	}
	return circles;
}

function RecomendationContent() {
	const { fetchRecommendations, isLoading, results, coordinates, error, setQuery, query } = useSearch();
	const searchParams = useSearchParams();
	const search = searchParams.get("q");

	const handleSearch = async (query: string) => {
		if (!coordinates) return;

		try {
			fetchRecommendations(query, `${coordinates.lat},${coordinates.lng}`);
		} catch (error) {
			console.error("API Error:", error);
		}
	};

	useEffect(() => {
		setQuery(query || search || "");
		if (search && coordinates && !results.data.length) {
			handleSearch(search);
		}
	}, [search, coordinates, results]);

	return (
		<div className="flex min-h-screen flex-col gap-6 px-4 pt-20">
			{error && (
				<div className="mx-auto flex grow flex-row items-center gap-6 pt-32">
					<AlertCircleIcon />
					<p className="text-2xl font-bold">{error}</p>
				</div>
			)}
			{isLoading && (
				<div className="flex grow flex-col items-center gap-6 pt-32">
					<Loader2 className="animate-spin" />
				</div>
			)}
			{!isLoading && !error && results.data.length === 0 && (
				<div className="mx-auto mt-8 flex max-w-sm flex-col items-center justify-center gap-4 rounded-xl border p-6 shadow-sm sm:mt-12 sm:max-w-2xl sm:gap-6 sm:p-8 md:max-w-3xl md:p-12">
					<p className="text-center text-xl leading-tight font-bold sm:text-2xl md:text-3xl">Try searching to get started</p>
					<p className="max-w-md text-center text-sm leading-relaxed text-gray-600 sm:max-w-lg sm:text-base">Start searching for recommendations to discover places tailored for you.</p>
				</div>
			)}
			<div className="flex flex-wrap justify-center gap-6 py-8">
				{results.data &&
					results.data.map(([id, nama, alamat, distance_km, deskripsi, harga, rating, total_ulasan, gambar], i) => (
						<motion.div animate={{ opacity: [0, 1], y: [-70, 0] }} transition={{ delay: i * 0.3 }} key={id} className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]">
							<Link href={`/recomendation/${slug(nama)}`} className="mx-auto flex flex-col overflow-hidden rounded-2xl bg-white/95 shadow-sm backdrop-blur-md xl:flex-row">
								<Image src={validateURL(gambar)} alt={nama} width={320} height={0} className="aspect-[4/3] w-full max-w-[320px] object-cover" />
								<div className="flex flex-1 flex-col justify-between bg-gradient-to-br from-white to-slate-50/50 p-6 xl:p-8">
									<div>
										<div className="flex flex-col">
											<div className="text-md font-medium tracking-wider text-rose-400/80">{(i + 1).toString().padStart(2, "0")}</div>
											<h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">{nama}</h1>
											<p className="text-sm">{distance_km} KM</p>
											<div className="my-2 text-sm font-semibold text-slate-600">
												{harga ? (
													<Badge variant="secondary" className="rounded-md bg-rose-100 px-2 py-1 text-rose-600">
														{parsePrice(harga)}
													</Badge>
												) : (
													<span className="opacity-0">-</span>
												)}
											</div>
											<div className="mt-1 flex items-center gap-2">
												<span className="text-sm font-semibold text-slate-600">{rating}</span>
												<div className="flex items-center gap-0.5">{renderCircles(parseFloat(rating))}</div>
												<span className="text-xs font-medium text-slate-500">{`(${total_ulasan} reviews)`}</span>
											</div>
											<div className="group flex gap-1.5 pt-2 text-sm text-slate-500 transition-colors duration-200 hover:text-rose-500">
												<MapPin size={14} className="mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
												<span className="cursor-pointer underline decoration-slate-200 decoration-1 underline-offset-4 group-hover:decoration-rose-200">{alamat}</span>
											</div>
										</div>
										<div className="mt-6">
											<p
												className="overflow-hidden text-base leading-relaxed text-slate-600"
												style={{
													display: "-webkit-box",
													WebkitLineClamp: 3,
													WebkitBoxOrient: "vertical",
												}}
											>
												{deskripsi}
											</p>
										</div>
									</div>
								</div>
							</Link>
						</motion.div>
					))}
			</div>
		</div>
	);
}

export default function RecomendationPageWithSuspense() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen items-center justify-center">
					<Loader2 className="animate-spin" />
				</div>
			}
		>
			<RecomendationContent />
		</Suspense>
	);
}

function validateURL(url: string): string {
	try {
		new URL(url); // Jika berhasil membuat instance URL, berarti valid
		return url;
	} catch {
		return ""; // Jika gagal, berarti bukan URL yang valid
	}
}
