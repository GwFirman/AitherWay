"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import { Playwrite_DE_LA } from "next/font/google";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";

const inter = Inter({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	display: "swap",
});

const playwrite = Playwrite_DE_LA({
	display: "swap",
});

const PricingList = [
	{
		tier: "Free",
		price: { month: "0 IDR", year: "0 IDR" },
		per: { month: "/ Month", year: "/ Year" },
		tagline: "Perfect for new users exploring basic travel recommendations.",
		features: [
			{ name: "Prompt-based destination recommendations", available: true },
			{ name: "Location details and entry prices", available: true },
			{ name: "Top 5 AI-curated recommendations", available: true },
			{ name: "No nearby destinations", available: true },
			{ name: "Supports Indonesian language", available: true },
			{ name: "Mobile & desktop responsive layout", available: true },
			{ name: "No search history saved", available: false },
			{ name: "No advanced preference filters", available: false },
			{ name: "No weekly destination updates", available: false },
		],
		buttonText: "Get Started",
		featured: false,
	},
	{
		tier: "Pro",
		price: { month: "75.000 IDR", year: "749.000 IDR" },
		per: { month: "/ Month", year: "/ Year" },
		tagline: "Great for active travelers wanting more control and insights.",
		features: [
			{ name: "All Free plan features", available: true },
			{ name: "Top 5 AI-curated recommendations", available: true },
			{ name: "Filter by budget, distance & rating", available: true },
			{ name: "Save search history", available: true },
			{ name: "Weekly destination updates", available: true },
			{ name: "Data-saver mode", available: true },
			{ name: "Improved AI accuracy", available: false },
			{ name: "New destination notifications", available: false },
		],
		buttonText: "Upgrade to Pro",
		featured: true,
	},
	{
		tier: "Exclusive",
		price: { month: "149.000 IDR", year: "1.499.000 IDR" },
		per: { month: "/ Month", year: "/ Year" },
		tagline: "Premium access for limitless exploration and early features.",
		features: [
			{ name: "All Pro plan features", available: true },
			{ name: "Best time-to-visit notifications", available: true },
			{ name: "Recommendations based on weather & season", available: true },
			{ name: "Real-time new destination alerts", available: true },
			{ name: "Priority user support", available: true },
			{ name: "Offline access & caching", available: true },
			{ name: "Access to upcoming features", available: true },
			{ name: "Experimental AI tools", available: true },
		],
		buttonText: "Choose Exclusive",
		featured: false,
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.3,
		},
	},
};

const cardVariants = {
	hidden: {
		y: 50,
		opacity: 0,
		scale: 0.95,
	},
	visible: (i: number) => ({
		y: 0,
		opacity: 1,
		scale: 1,
		transition: {
			delay: i * 0.1,
			duration: 0.8,
			ease: [0.215, 0.61, 0.355, 1],
			scale: {
				type: "spring",
				damping: 15,
				stiffness: 100,
			},
		},
	}),
	hover: {
		y: -8,
		transition: {
			duration: 0.3,
			ease: "easeOut",
		},
	},
};

export default function Pricing() {
	const [isYearly, setIsYearly] = useState(false);

	const handleSwitch = (checked: boolean) => {
		setIsYearly(checked);
	};

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.5 }}
			className="container max-w-7xl mx-auto py-16 px-4 pt-28 sm:px-6 lg:px-8"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.5 }}
				className="text-center mb-8"
			>
				<span
					className={`inline-block text-base sm:text-lg font-medium text-rose-500 mb-2 ${playwrite.className}`}
				>
					Pricing Plans
				</span>
				<h2
					className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 ${inter.className}`}
				>
					Simple and Transparent Pricing
				</h2>
				<p
					className={`text-base text-gray-600 max-w-2xl mx-auto ${inter.className}`}
				>
					Unlock the full potential of our AI-powered tools with flexible
					Pricing options. Start for free, upgrade anytime.
				</p>
			</motion.div>

			<motion.div className="flex flex-row items-center justify-center">
				<div className="flex items-center gap-4 mb-6">
					<h2>
						<span className={`text-lg font-semibold ${inter.className}`}>
							Monthly
						</span>
					</h2>
					<div className="flex items-center gap-2">
						<Switch
							checked={isYearly}
							onCheckedChange={handleSwitch}
							aria-label="Toggle pricing"
						/>
					</div>
					<h2>
						<span className={`text-lg font-semibold ${inter.className}`}>
							Yearly
						</span>
					</h2>
				</div>
			</motion.div>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="flex flex-col items-center justify-center py-6"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
					{PricingList.map((pricing, index) => (
						<motion.div
							key={pricing.tier}
							custom={index}
							variants={cardVariants}
							whileHover="hover"
							className={`flex flex-col h-full shadow-lg hover:shadow-xl ${pricing.featured
								? "bg-rose-500 text-white border border-rose-500 lg:scale-102 z-10"
								: "bg-white text-gray-800 border border-slate-200"
								} rounded-2xl px-6 py-8 transition-shadow duration-300 relative`}
						>
							{pricing.featured && (
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5 }}
									className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-rose-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md"
								>
									Most Popular
								</motion.div>
							)}

							<div className="mb-4">
								<h3 className={`text-xl font-bold mb-2 ${inter.className}`}>
									{pricing.tier}
								</h3>
								<p
									className={`text-sm opacity-90 leading-relaxed ${inter.className}`}
								>
									{pricing.tagline}
								</p>
							</div>

							<div className="mb-6">
								<div className="flex items-baseline gap-1">
									<span className="text-4xl font-extrabold">
										{isYearly ? pricing.price.year : pricing.price.month}
									</span>
									<span className="text-base font-medium opacity-80">
										{isYearly ? pricing.per.year : pricing.per.month}
									</span>
								</div>
								{isYearly && pricing.tier !== "Free" && (
									<div className="mt-2">
										<span className="inline-block px-2 py-0.5 text-xs rounded-md bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 font-semibold shadow-sm">
											Save {pricing.tier === "Pro" ? "50.000 IDR" : "100.000 IDR"}/year
										</span>
									</div>
								)}
							</div>

							<ul className="flex flex-col gap-3 mb-8 flex-1">
								{pricing.features.map((feature, i) => (
									<li
										key={feature.name}
										className={`flex items-center gap-2 text-sm ${pricing.featured
											? feature.available
												? "text-white"
												: "text-rose-100/70"
											: feature.available
												? "text-gray-800"
												: "text-slate-400"
											}`}
									>
										{feature.available ? (
											<FaCheckCircle
												className={
													pricing.featured ? "text-white" : "text-rose-500"
												}
												size={16}
											/>
										) : (
											<FaTimesCircle
												className={
													pricing.featured
														? "text-rose-100/70"
														: "text-slate-300"
												}
												size={16}
											/>
										)}
										<span className="leading-tight">{feature.name}</span>
									</li>
								))}
							</ul>

							<motion.button
								whileHover={{ scale: 1.01 }}
								whileTap={{ scale: 0.98 }}
								className={`w-full rounded-lg py-3 font-medium transition-all duration-200 text-base
                  ${pricing.featured
										? "bg-white text-rose-500 hover:bg-rose-50"
										: "bg-rose-500 text-white hover:bg-rose-600"
									}
                  shadow-sm`}
							>
								{pricing.buttonText}
							</motion.button>
						</motion.div>
					))}
				</div>
			</motion.div>
		</motion.section>
	);
};
