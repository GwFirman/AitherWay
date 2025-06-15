// File: components/ReviewTravel.tsx

"use client";

import { Inter } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaCircle, FaRegCircle, FaAdjust } from "react-icons/fa";

const inter = Inter({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	display: "swap",
});

// Helper functions
const getRatingAsNumber = (rating: any): number => {
	if (typeof rating === "number") return rating;
	if (typeof rating === "string") {
		const cleanRating = rating.replace(/[^\d.,]/g, "");
		const parsedRating = parseFloat(cleanRating.replace(",", "."));
		return isNaN(parsedRating) ? 0 : Math.min(Math.max(parsedRating, 0), 5);
	}
	return 0;
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

type Review = {
	id: string;
	nama: string;
	rating: number | string;
	komentar: string;
};


const ReviewTravel = ({ reviews }: { reviews: Review[] }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	const [isExpanded, setIsExpanded] = useState(false);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};
	

	const initialVisibleCount = 4;
	const hasMoreReviews = reviews.length > initialVisibleCount;

	return (
		<div ref={ref} className={`mx-auto max-w-7xl px-4 py-8 ${inter.className}`}>
			<h2 className="mb-8 text-2xl font-semibold text-gray-900">Ulasan Pengunjung</h2>

			<div className="relative">
				<motion.div
					className={`grid grid-cols-1 gap-6 transition-all duration-500 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
					style={{
						maxHeight: !hasMoreReviews || isExpanded ? "none" : "40rem",
						overflow: "hidden",
					}}
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
				>
					{reviews.map((review) => (
						<motion.div key={review.id} className="space-y-4 rounded-xl border border-gray-200/60 bg-white p-6 shadow-sm" variants={cardVariants}>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<h3 className="mb-2 text-lg font-medium text-gray-900">{review.nama}</h3>
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium text-gray-700">{getRatingAsNumber(review.rating).toFixed(1)}</span>
										<div className="flex items-center gap-0.5">{renderCircles(getRatingAsNumber(review.rating))}</div>
									</div>
								</div>
							</div>
							<div className="pt-2">
								<p className="line-clamp-5 text-base leading-relaxed text-gray-600">{review.komentar}</p>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Gradient overlay */}
				{hasMoreReviews && !isExpanded && <div className="pointer-events-none absolute bottom-0 left-0 h-60 w-full bg-gradient-to-t from-white via-white/90 to-transparent" />}

				{/* Show more button */}
				{hasMoreReviews && !isExpanded && (
					<div className="absolute bottom-0 left-0 flex w-full justify-center pb-6">
						<button onClick={() => setIsExpanded(true)} className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50">
							Tampilkan semua ulasan
						</button>
					</div>
				)}
			</div>

			{/* Show collapse button when expanded */}
			{hasMoreReviews && isExpanded && (
				<div className="mt-8 flex justify-center">
					<button onClick={() => setIsExpanded(false)} className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50">
						Tampilkan lebih sedikit
					</button>
				</div>
			)}
		</div>
	);
};

export default ReviewTravel;
