"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import slug from "slug";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaCircle, FaRegCircle, FaAdjust } from "react-icons/fa";

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

// data dummy sementara
const dummyPlaces = [
    [
        "1",
        "Candi Borobudur",
        "Magelang, Jawa Tengah",
        5.6,
        "Candi Buddha terbesar di dunia, situs warisan dunia UNESCO.",
        "50000",
        4.8,
        2123,
        "/images/borobudur.jpg",
    ],
    [
        "2",
        "Pantai Parangtritis",
        "Yogyakarta",
        12.3,
        "Pantai terkenal dengan ombak besar dan sunset yang indah.",
        "Gratis",
        4.5,
        1389,
        "/images/parangtritis.jpg",
    ],
    [
        "3",
        "Gunung Bromo",
        "Probolinggo, Jawa Timur",
        87.9,
        "Gunung aktif dengan kawah spektakuler dan pemandangan sunrise.",
        "30000",
        4.9,
        3456,
        "/images/bromo.jpg",
    ],
    [
        "4",
        "Kawah Putih",
        "Ciwidey, Bandung",
        19.1,
        "Danau vulkanik dengan air putih kehijauan yang memesona.",
        "27000",
        4.7,
        1543,
        "/images/kawahputih.jpg",
    ],
    [
        "5",
        "Taman Safari",
        "Cisarua, Bogor",
        32.0,
        "Taman satwa dengan pengalaman berinteraksi langsung bersama hewan.",
        "230000",
        4.6,
        2890,
        "/images/tamansafari.jpg",
    ],
];

export default function OtherPlaces() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Lihat tempat Lainnya</h2>
            <div className="flex overflow-x-auto gap-4 py-4">
                {dummyPlaces.slice(0, 5).map(([id, nama, alamat, distance_km, deskripsi, harga, rating, total_ulasan, gambar], i) => (
                    <motion.div
                        animate={{ opacity: [0, 1], y: [-70, 0] }}
                        transition={{ delay: i * 0.2 }}
                        key={id}
                        className="flex-shrink-0 w-[300px]"
                    >
                        <Link
                            href={`/recomendation/${slug(nama)}`}
                            className="flex h-full flex-col overflow-hidden rounded-2xl bg-white/95 shadow-sm backdrop-blur-md"
                        >
                            <Image
                                src={gambar}
                                alt={nama}
                                width={300}
                                height={0}
                                className="aspect-[4/3] w-full object-cover"
                            />
                            <div className="flex flex-1 flex-col justify-between bg-gradient-to-br from-white to-slate-50/50 p-4">
                                <div>
                                    <h1 className="text-lg font-bold text-slate-800">{nama}</h1>
                                    <p className="text-sm">{distance_km} KM</p>
                                    <div className="my-1 text-sm font-semibold text-slate-600">
                                        {harga ? (
                                            <Badge variant="secondary" className="rounded bg-rose-100 px-2 py-1 text-rose-600">
                                                {harga === "Gratis" ? "Free" : `${harga} IDR`}
                                            </Badge>
                                        ) : (
                                            <span className="opacity-0">-</span>
                                        )}
                                    </div>
                                    <div className="mt-1 flex items-center gap-2">
                                        <span className="text-sm font-semibold text-slate-600">{rating}</span>
                                        <div className="flex items-center gap-0.5">{renderCircles(parseFloat(rating))}</div>
                                        <span className="text-xs text-slate-500">{`(${total_ulasan} reviews)`}</span>
                                    </div>
                                    <div className="group mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                                        <MapPin size={14} />
                                        <span className="line-clamp-1">{alamat}</span>
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
