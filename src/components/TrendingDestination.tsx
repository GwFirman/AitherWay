import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { Inter } from 'next/font/google';
import { Playwrite_DE_LA } from 'next/font/google';

import { FaStar } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';

import GunungBromo from '@/images/GunungBromo.jpg';
import PantaiKlingking from '@/images/PantaiKlingkingBali.jpg';
import RajaAmpat from '@/images/RajaAmpat.jpg';

const inter = Inter({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
})

const playwrite = Playwrite_DE_LA({
    display: 'swap',
})

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
    }
]

const TrendingDestination = () => {
    return (
        <section id='trending-destination' className="py-16 container mx-auto px-4">
            <div className='text-center mb-12'>
                <span className={`text-rose-500 text-xl font-medium ${playwrite.className}`}>Exciting Destinations</span>
                <h2 className={`text-3xl font-bold mt-2 ${inter.className}`}>Popular Destinations</h2>
            </div>

            <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:h-90 gap-8 w-full max-w-5xl">
                    {destination.map((destination, index) => (
                        <motion.div
                            key={index}
                            className="rounded-xl shadow-lg overflow-hidden"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="relative h-48 w-full">
                                <Image
                                    src={destination.image}
                                    alt={destination.title}
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                                    <FaStar className="text-yellow-400" />
                                    <span className="ml-1 text-white text-sm">
                                        {destination.rating}
                                    </span>
                                </div>
                            </div>
                            <div className="relative top-20 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-xl font-semibold mb-2 text-white">
                                    {destination.title}
                                </h3>
                                <div className="flex items-center">
                                    <IoLocationSharp className="mr-1 text-white" />
                                    <span className="text-sm text-white">
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