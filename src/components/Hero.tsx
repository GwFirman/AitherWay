"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inter } from "next/font/google";
import { FaArrowRightLong } from "react-icons/fa6";

import BeachHero from "@/assets/images/BeachHero.jpg";
import ElementArrow from "@/assets/images/element/Arrow.png";
import PolaroidPhotoLombok from "@/assets/images/PantaiPinkLombok.jpg";
import SearchBar from "@/components/ui/search-bar";
import Image from "next/image";

interface HeroProps {
	backgroundImage?: string;
}

const inter = Inter({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	display: "swap",
});

const Hero: React.FC<HeroProps> = ({ backgroundImage }) => {
	const [isLoaded, setIsLoaded] = useState(false);

	const backGround = backgroundImage || BeachHero.src;

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.5,
				staggerChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.5, ease: "easeOut" },
		},
	};

	return (
		<div className="relative min-h-screen w-full overflow-hidden">
			<motion.div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				initial={{ scale: 1.1, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.8 }}
				style={{
					backgroundImage: `url(${backGround})`,
					backgroundPosition: "center",
				}}
			>
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="absolute inset-0 bg-gradient-to-t from-teal-800/50 to-transparent"></motion.div>
			</motion.div>

			{/* Hero Content */}
			<motion.div className="relative z-10 min-h-screen flex flex-col justify-center" variants={containerVariants} initial="hidden" animate="visible">
				{/* Main Content */}
				<div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${inter.className}`}>
					<motion.div className="max-w-4xl text-center text-white" variants={itemVariants}>
						<motion.h1 className="text-4xl md:text-5xl font-bold mb-4" variants={itemVariants}>
							Let <span className="text-rose-500">AI</span> Guide You to the Indonesian's Best-Kept <span className="text-cyan-400">Travel</span> Secrets
						</motion.h1>
						<div className="relative w-fit mx-auto">
							<motion.p className="text-lg mb-8 opacity-90" variants={itemVariants}>
								Plan your perfect getaway through smart prompts, live maps, and peaceful escapes.
							</motion.p>

							{/* Floating Arrow */}
							<motion.div className="absolute -left-48 -top-1 max-w-44" initial={{ opacity: 0, y: 40, rotate: -80, scale: 0.9 }} animate={{ opacity: 1, y: 0, rotate: -60, scale: 0.95 }} transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}>
								<Image width={208} height={0} src={ElementArrow.src} className="w-full h-auto -rotate-0" alt="Arrow" />
							</motion.div>
						</div>
					</motion.div>
				</div>

				{/* Search Bar */}
				<SearchBar />

				{/* Floating Polaroid */}
				<motion.div className="absolute z-50 right-14 bottom-16 sm:bottom-24 md:bottom-32 justify-start hidden xl:flex" initial={{ opacity: 0, y: 60, rotate: -24, scale: 0.9 }} animate={{ opacity: 1, y: 0, rotate: -12, scale: 0.95 }} transition={{ delay: 1.4, duration: 0.7, ease: "easeOut" }}>
					<div className="w-[200px] h-[280px]">
						<div className="bg-white p-2 shadow-xl rounded-md w-full h-full flex items-center justify-center">
							<Image width={300} height={0} src={PolaroidPhotoLombok.src} alt="Polaroid" className="w-full h-full object-cover rounded" />
						</div>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};
export default Hero;
