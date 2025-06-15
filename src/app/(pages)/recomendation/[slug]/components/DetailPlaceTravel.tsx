"use client";

import { motion } from "framer-motion";
import { Ticket, MapPin, Users } from "lucide-react";
import { FaCircle, FaRegCircle, FaAdjust } from "react-icons/fa";

type DetailsPlaceProps = {
	data: {
		deskripsi?: string;
		rating?: string;
		total_ulasan?: number;
		harga?: string;
		jarak_km?: string;
		map_url?: string;
	};
};

const getRatingAsNumber = (rating?: string) => {
	const num = parseFloat(rating || "0");
	return isNaN(num) ? 0 : num;
};

function renderCircles(rating: number) {
	const circles = [];
	for (let i = 1; i <= 5; i++) {
		const diff = rating - (i - 1);
		if (diff >= 1) {
			circles.push(<FaCircle key={i} className="h-4 w-4 text-rose-500" />);
		} else if (diff >= 0.25 && diff <= 0.75) {
			circles.push(<FaAdjust key={i} className="h-4 w-4 text-rose-400" />);
		} else if (diff > 0) {
			circles.push(<FaAdjust key={i} className="h-4 w-4 text-rose-300 opacity-70" />);
		} else {
			circles.push(<FaRegCircle key={i} className="h-4 w-4 text-rose-300" />);
		}
	}
	return circles;
}

export const DetailPlace = ({ data }: DetailsPlaceProps) => {
	const ratingNum = getRatingAsNumber(data.rating);

	return (
		<div className="mx-auto max-w-7xl px-4 py-8">
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
				{/* Description */}
				<div className="space-y-8 lg:col-span-2">
					<motion.div
						initial="hidden"
						whileInView="visible"
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
						}}
						viewport={{ once: true, amount: 0.3 }}
						className="rounded-xl border border-gray-200 bg-white p-6 shadow-md"
					>
						<h2 className="mb-6 text-2xl font-semibold text-gray-900">Tentang Tempat Ini</h2>
						<div className="prose prose-gray max-w-none">
							<p className="text-base leading-relaxed text-gray-600">{data.deskripsi || "Deskripsi tempat wisata ini belum tersedia. Namun, tempat ini menawarkan pengalaman wisata yang menarik dan tak terlupakan untuk dikunjungi bersama keluarga dan teman-teman."}</p>
						</div>
					</motion.div>
				</div>

				{/* Sidebar */}
				<div className="space-y-6 lg:col-span-2">
					{/* Overview Cards */}
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						{/* Rating Card */}
						<motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
							<div className="mb-3 flex items-center gap-2">
								<span className="text-xl font-semibold text-gray-900">{ratingNum ? ratingNum.toFixed(1) : "0.0"}</span>
								<div className="flex items-center gap-0.5">{renderCircles(ratingNum)}</div>
							</div>
							<div className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase">RATING</div>
							<div className="flex items-center gap-1.5 text-sm text-gray-600">
								<Users className="h-4 w-4" />
								{data.total_ulasan?.toLocaleString() || 0} ulasan
							</div>
						</motion.div>

						{/* Price Card */}
						<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true, amount: 0.3 }} className="rounded-xl border border-gray-200/60 bg-white p-5 shadow-sm">
							<div className="mb-3 flex items-center gap-2">
								<Ticket className="h-5 w-5 text-emerald-600" />
								<span className="text-sm font-medium text-gray-700">Harga Tiket</span>
							</div>
							{data.harga ? <div className="text-xl font-semibold text-emerald-600">{data.harga === "Gratis" ? "Gratis" : data.harga}</div> : <div className="text-sm text-gray-400">Belum tersedia</div>}
							<div className="mt-1 text-xs text-gray-500">per orang</div>
						</motion.div>

						{/* Location Card */}
						<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true, amount: 0.3 }} className="rounded-xl border border-gray-200/60 bg-white p-5 shadow-sm">
							<div className="mb-3 flex items-center gap-2">
								<MapPin className="h-5 w-5 text-blue-600" />
								<span className="text-sm font-medium text-gray-700">Jarak Lokasi</span>
							</div>
							{data.jarak_km ? <div className="text-xl font-semibold text-blue-600">{data.jarak_km}</div> : <div className="text-sm text-gray-400">Tidak tersedia</div>}
							<div className="mt-1 text-xs text-gray-500">dari pencarian</div>
						</motion.div>
					</div>

					{/* CTA Button */}
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }} className="border-t border-gray-100 pt-6">
						<a href={data.map_url} target="_blank" rel="noopener noreferrer" className="block w-full rounded-xl bg-rose-500 px-6 py-3.5 text-center font-medium text-white shadow-sm transition-colors duration-200 hover:bg-rose-600">
							Lihat Lokasi di Peta
						</a>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default DetailPlace;
