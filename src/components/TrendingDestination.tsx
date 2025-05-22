import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Inter } from "next/font/google";
import { Playwrite_DE_LA } from "next/font/google";

import { FaStar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

import GunungBromo from "@/images/GunungBromo.jpg";
import PantaiKlingking from "@/images/PantaiKlingkingBali.jpg";
import RajaAmpat from "@/images/RajaAmpat.jpg";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const playwrite = Playwrite_DE_LA({
  display: "swap",
});

const destination = [
  {
    image: GunungBromo,
    title: "Gunung Bromo",
    location: "East Java, Indonesia",
    rating: 4.8,
  },
  {
    image: PantaiKlingking,
    title: "Pantai Klingking",
    location: "Bali, Indonesia",
    rating: 4.9,
  },
  {
    image: RajaAmpat,
    title: "Raja Ampat",
    location: "Papua, Indonesia",
    rating: 4.9,
  },
];

const TrendingDestination = () => {
  return (
    <section id="trending-destination" className="py-16 container mx-auto px-4">
      {/* Title section remains the same */}
      <div className="text-center mb-12">
        <span
          className={`inline-blocktext-lg sm:text-xl font-medium text-rose-500 ${playwrite.className}`}
        >
          Exciting Destinations
        </span>
        <h2
          className={`text-3xl sm:text-3xl md:text-4xl font-bold mt-2 text-gray-800 ${inter.className}`}
        >
          Popular Destinations
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {destination.map((destination, index) => (
            <motion.div
              key={destination.title}
              className="rounded-xl shadow-lg overflow-hidden relative h-[300px] xs:h-[350px] sm:h-[400px] md:h-[350px] lg:h-[400px]" // Adjusted heights for different breakpoints
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
            >
              {/* Image container */}
              <div className="absolute inset-0">
                <Image
                  src={destination.image}
                  alt={destination.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0}
                />
              </div>

              {/* Rating badge */}
              <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center z-10">
                <FaStar className="text-yellow-400" />
                <span className="ml-1.5 text-white text-sm font-medium">
                  {destination.rating}
                </span>
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                  {destination.title}
                </h3>
                <div className="flex items-center">
                  <IoLocationSharp className="mr-1.5 text-white" />
                  <span className="text-sm text-white/90 font-medium">
                    {destination.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingDestination;
