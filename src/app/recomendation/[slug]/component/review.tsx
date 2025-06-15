// File: components/ReviewSection.tsx

"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star } from "lucide-react";

// Helper functions (getRatingAsNumber, renderStars)
const getRatingAsNumber = (rating: any): number => {
    if (typeof rating === 'number') return rating;
    if (typeof rating === 'string') {
        const cleanRating = rating.replace(/[^\d.,]/g, '');
        const parsedRating = parseFloat(cleanRating.replace(',', '.'));
        return isNaN(parsedRating) ? 0 : Math.min(Math.max(parsedRating, 0), 5);
    }
    return 0;
};

const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
        <Star
            key={index}
            className={`w-5 h-5 ${index < Math.floor(rating) ? "text-yellow-400 fill-current" : index < rating ? "text-yellow-400 fill-current opacity-50" : "text-gray-300"}`}
        />
    ));
};

type Review = {
    id: string;
    nama: string;
    rating: number | string;
    komentar: string;
};

export default function ReviewSection({ reviews }: { reviews: Review[] }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    // Menggunakan state boolean untuk kontrol yang lebih jelas
    const [isExpanded, setIsExpanded] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Perkecil delay agar lebih cepat
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // Tentukan berapa banyak ulasan yang terlihat sebelum "Tampilkan Lainnya"
    const initialVisibleCount = 4;
    // Cek apakah jumlah ulasan melebihi batas awal
    const hasMoreReviews = reviews.length > initialVisibleCount;

    return (
        <div ref={ref} className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ulasan Pengunjung</h2>

            {/* 1. Buat kontainer 'relative' untuk membungkus grid dan overlay */}
            <div className="relative">
                {/* 2. Atur tinggi dan overflow secara dinamis.
                     Saat tidak diperluas, tingginya dibatasi dan overflow disembunyikan.
                */}
                <motion.div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500`}
                    style={{
                        maxHeight: !hasMoreReviews || isExpanded ? 'none' : '55rem', // Sesuaikan tinggi ini jika perlu
                        overflow: 'hidden',
                    }}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Hapus .slice() - render semua ulasan */}
                    {reviews.map((review) => (
                        <motion.div
                            key={review.id}
                            className="bg-white rounded-xl p-6 shadow border border-gray-100 space-y-4"
                            variants={cardVariants}
                        >
                             <div className="flex items-center justify-between">
                                <p className="text-lg font-semibold text-gray-900">{review.nama}</p>
                                <div className="flex items-center">
                                    {renderStars(getRatingAsNumber(review.rating))}
                                </div>
                            </div>
                            <p className="text-gray-700 text-base leading-relaxed">
                                {review.komentar}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 3. Tambahkan overlay HANYA jika tidak diperluas & ada ulasan lebih */}
                {hasMoreReviews && !isExpanded && (
                    <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-gray-50 to-transparent backdrop-blur-sm pointer-events-none" />
                )}

                {/* 4. Tambahkan teks trigger HANYA jika tidak diperluas & ada ulasan lebih */}
                {hasMoreReviews && !isExpanded && (
                    <div className="absolute bottom-0 left-0 w-full flex justify-center pb-8">
                        <p
                            onClick={() => setIsExpanded(true)}
                            className="text-rose-600 font-semibold cursor-pointer hover:underline"
                        >
                            Tampilkan semua ulasan
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}