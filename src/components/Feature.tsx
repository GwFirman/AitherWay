"use client";

import { motion } from "framer-motion";

import { Inter } from "next/font/google";
import { Playwrite_DE_LA } from "next/font/google";

import { BiMapPin } from "react-icons/bi";
import { FaRegCompass } from "react-icons/fa";
import { RiRouteLine } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi2";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const playwrite = Playwrite_DE_LA({
  display: "swap",
});

const features = [
  {
    icon: BiMapPin,
    title: "Smart Destination Match",
    description: "Get location picks based on your preferences—no endless searching needed.",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    icon: FaRegCompass,
    title: "Instant Travel Suggestions",
    description: "Tell us your mood or vibe, and we'll recommend your next trip in seconds.",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  {
    icon: RiRouteLine,
    title: "Auto Route Mapping",
    description: "We map your journey with time-saving routes and helpful local insights.",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    icon: HiOutlineSparkles,
    title: "Top 5 Hidden Gems",
    description: "Discover curated places you didn’t know existed—tailored just for you.",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-500",
  },
];

const Feature = () => {
  return (
    <section id="features" className="py-16 container mx-auto px-4">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className={`inline-block text-lg sm:text-xl font-medium text-rose-500 ${playwrite.className}`}>
          Features
        </span>
        <h2 className={`text-3xl font-bold mt-2 text-gray-800 ${inter.className}`}>
          Revolutionary Features
        </h2>
        <p className={`text-gray-600 mt-4 max-w-2xl mx-auto ${inter.className}`}>
          AitherWay brings powerful travel tools to your fingertips—from personalized destination matching to automatic route mapping, all tailored to your journey.
        </p>
      </motion.div>

      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
            >
              {/* Icon container */}
              <div className={`${feature.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className={`text-2xl ${feature.iconColor}`} />
              </div>

              {/* Content */}
              <div>
                <h3 className={`text-lg font-semibold mb-3 text-gray-800 ${inter.className}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm text-gray-600 leading-relaxed ${inter.className}`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
