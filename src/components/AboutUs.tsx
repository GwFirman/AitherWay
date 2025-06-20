import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import { Inter } from "next/font/google";
import { Playwrite_DE_LA } from "next/font/google";
import { Nunito } from "next/font/google";

import { FaArrowRightLong } from "react-icons/fa6";

import Person from "@/assets/images/Person.png";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	display: "swap",
});

const playwrite = Playwrite_DE_LA({
	display: "swap",
});

const nunito = Nunito({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	display: "swap",
});

const AboutUs = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		const section = document.getElementById("about-us");
		if (section) {
			observer.observe(section);
		}

		return () => {
			if (section) {
				observer.unobserve(section);
			}
		};
	}, []);

	const variants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<section id="about-us" className="py-8 container mx-auto px-4">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
					{/* Left */}
					<motion.div className="w-full lg:w-2/5 lg:flex justify-center items-center hidden" initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={variants} transition={{ duration: 0.6 }}>
						<div className="relative w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] aspect-[3/4]">
							<div
								className="absolute z-10 w-[85%] h-[95%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                bg-gradient-to-br from-teal-500 to-emerald-600
                rounded-t-[3rem] shadow-lg shadow-emerald-300/30"
							/>
							<div className="absolute inset-0 z-20 flex items-center justify-center">
								<Image width={512} height={0} src={Person.src} alt="Person illustration" className="w-full h-full object-contain md:mt-1.5" />
							</div>
						</div>
					</motion.div>

					{/* Right */}
					<motion.div className="w-full lg:w-3/5 text-left" initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={variants} transition={{ duration: 0.6, delay: 0.2 }}>
						<motion.span className={`inline-block text-rose-500 text-lg sm:text-xl font-medium ${playwrite.className}`} variants={variants} transition={{ delay: 0.3 }}>
							About Us
						</motion.span>
						<motion.h2 className={`text-3xl font-bold mt-4 leading-tight text-gray-800 ${nunito.className}`} variants={variants} transition={{ delay: 0.4 }}>
							We Help You Uncover <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">Indonesia's Hidden Gems</span> Effortlessly and Enjoyably
						</motion.h2>
						<motion.p
							className={`text-gray-600 mt-4 text-base leading-relaxed ${inter.className}`}
							variants={variants}
							transition={{ delay: 0.5 }}
						>
							AitherWay is an AI-powered travel assistant that helps you discover the perfect destination in Java just by describing what you want. From “cool hidden places” to “quiet and cheap spots,” simply type in any prompt and AitherWay will instantly respond with trusted recommendations near your location. No route planning, no filters just smart, personalized suggestions with essential info like price, rating, and full descriptions.
						</motion.p>

						<motion.ul
							className="mt-8 lg:mt-4 pl-4 grid grid-cols-1 sm:grid-cols-2 sm:gap-2 md:gap-3 lg:gap-5 text-base lg:text-xl text-gray-800 list-disc font-semibold"
							variants={variants}
							transition={{ delay: 0.6 }}
						>
							<li>Location-Aware AI Suggestions</li>
							<li>Top 5 Personalized Hidden Gems</li>
							<li>Full Details: Prices, Ratings & Descriptions</li>
							<li>Explore 2,000+ Tourist Destinations Across Java</li>
						</motion.ul>

						{/* Button */}
						<motion.div variants={variants} transition={{ delay: 0.7 }}>
							<Button className="rounded-full mt-8 lg:mt-6 text-base px-6 py-4 sm:py-5 text-white bg-rose-500 hover:bg-rose-500 shadow-sm cursor-pointer flex items-center gap-2">
								<Link href="/about" className="flex items-center gap-2">
									More About Us <FaArrowRightLong />
								</Link>
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default AboutUs;
