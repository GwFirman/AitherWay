"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import slug from "slug";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaCircle, FaRegCircle, FaAdjust } from "react-icons/fa";

type Place = {
	id: string;
	nama: string;
	alamat: string;
	distance_km?: number;
	deskripsi: string;
	harga: string;
	rating: string;
	total_ulasan: number;
	gambar: string;
	slug: string;
};

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

export default function OtherPlaceTravel({ places }: { places: Place[] }) {
	if (!places?.length) {
		return (
			<div className="mx-auto max-w-7xl px-6 py-8">
				<h2 className="mb-6 text-2xl font-bold text-gray-900">Lihat Tempat Lainnya</h2>
				<div className="py-8 text-center text-gray-500">Belum ada tempat lain yang tersedia.</div>
			</div>
		);
	}
	return (
		<div className="mx-auto max-w-7xl px-6 py-8">
			<h2 className="mb-6 text-2xl font-bold text-gray-900">Lihat Tempat Lainnya</h2>
			<div className="flex gap-6 overflow-x-auto py-4">
				{places.map((place, i) => (
					<motion.div animate={{ opacity: [0, 1], y: [-70, 0] }} transition={{ delay: i * 0.2 }} key={place.id} className="w-[300px] flex-shrink-0">
						<Link href={`/recomendation/${slug(String(place.nama))}`} className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white/95 shadow-md backdrop-blur-md">
							{place.harga && <div className="absolute top-2 right-2 rounded bg-rose-600/80 px-3 py-1 text-sm font-semibold text-white shadow-md backdrop-blur-md backdrop-filter">{place.harga === "Gratis" ? "Free" : `${place.harga}`}</div>}
							<Image src={String(place.gambar)} alt={String(place.nama)} width={300} height={0} className="aspect-[4/3] w-full object-cover" />
							<div className="flex flex-1 flex-col justify-between bg-gradient-to-br from-white to-slate-50/50 p-5">
								<div>
									<h1 className="text-lg font-bold text-slate-800">{place.nama}</h1>
									<p className="text-sm">{typeof place.distance_km === "number" && !isNaN(place.distance_km) ? `${place.distance_km.toFixed(1)} KM` : "-"}</p>
									<div className="mt-2 flex items-center gap-3">
										<span className="text-sm font-semibold text-slate-600">{place.rating}</span>
										<div className="flex items-center gap-1">{renderCircles(parseFloat(String(place.rating)))}</div>
										<span className="text-xs text-slate-500">{`(${place.total_ulasan} reviews)`}</span>
									</div>
									<div className="group mt-2 flex items-center gap-2 text-sm text-slate-500">
										<MapPin size={16} className="flex-shrink-0" />
										<span className="line-clamp-1">{place.alamat}</span>
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
