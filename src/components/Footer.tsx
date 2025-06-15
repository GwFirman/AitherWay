"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

const Footer = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [year, setYear] = useState(new Date().getFullYear());

	useEffect(() => {
		const handleScroll = () => {
			const footer = document.getElementById("footer");
			if (footer) {
				const position = footer.getBoundingClientRect();
				setIsVisible(position.top <= window.innerHeight);
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Check initial position

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
		},
	};

	return (
		<footer id="footer" className="bg-gray-900 text-white pt-12 overflow-hidden mt-auto">
			<motion.div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-start gap-8 lg:gap-12" variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
				{/* Brand Section */}
				<motion.div className={`w-full sm:w-auto`} variants={itemVariants}>
					<motion.div className="flex items-center space-x-2 mb-4" whileHover={{ scale: 1.05 }}>
						<span className="text-2xl font-semibold">AitherWay</span>
					</motion.div>
					<p className="text-sm text-gray-300 mb-6 max-w-sm">AitherWay is your ultimate travel companion, providing personalized itineraries and recommendations for your next adventure. Explore indonesia with us!</p>
				</motion.div>

				{/* Contact Info */}
				<motion.div variants={itemVariants} className="w-full sm:w-auto">
					<h4 className="text-lg font-semibold mb-4">Talk To Us</h4>
					<ul className="space-y-3">
						{[
							{ icon: <FaPhone />, text: "+62 123 4567" },
							{ icon: <IoMail />, text: "support@aitherway.com" },
							{ icon: <FaLocationDot />, text: "Purwokerto, Indonesia" },
						].map((item, index) => (
							<motion.li key={index} className="flex items-center gap-3 text-gray-300" transition={{ type: "spring", stiffness: 300 }}>
								<span className="text-rose-500">{item.icon}</span>
								{item.text}
							</motion.li>
						))}
					</ul>
				</motion.div>
			</motion.div>

			{/* Copyright */}
			<motion.div className="border-t border-gray-800 mt-12 py-6 text-center" variants={itemVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
				<p className="text-sm text-gray-400">&copy; {year} AitherWay. All rights reserved.</p>
			</motion.div>
		</footer>
	);
};

export default Footer;
