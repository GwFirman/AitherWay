"use client";

import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import { Playwrite_DE_LA } from "next/font/google";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const playwrite = Playwrite_DE_LA({
  display: "swap",
});

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "Amazing experience! The AI recommendations were spot-on for our Bali trip.",
    name: "Sarah Johnson",
    title: "Travel Blogger",
  },
  {
    quote:
      "Found incredible hidden gems in Raja Ampat thanks to this platform.",
    name: "Michael Chen",
    title: "Adventure Seeker",
  },
  {
    quote: "The local insights made our Indonesian journey truly special.",
    name: "Emma Wilson",
    title: "Cultural Enthusiast",
  },
  {
    quote:
      "The itinerary suggestions were perfect for our family vacation in Bali.",
    name: "David Smith",
    title: "Family Traveler",
  },
  {
    quote:
      "I loved the personalized recommendations! It made my trip to Indonesia unforgettable.",
    name: "Sophia Brown",
    title: "Solo Traveler",
  },
  {
    quote:
      "The user-friendly interface and AI-driven suggestions made planning a breeze.",
    name: "James Taylor",
    title: "Tech Enthusiast",
  },
];

const UserReview = () => {
  return (
    <section id="user-review" className="py-8 container mx-auto px-4">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span
          className={`inline-blocktext-lg sm:text-xl font-medium text-rose-500 ${playwrite.className}`}
        >
          User Reviews
        </span>
        <h2
          className={`text-3xl sm:text-3xl md:text-4xl font-bold mt-2 text-gray-800 ${inter.className}`}
        >
          What Our Users Say
        </h2>
      </motion.div>
      <div className="rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={defaultTestimonials}
          direction="right"
          speed="slow"
        />
        <InfiniteMovingCards
          items={defaultTestimonials}
          direction="left"
          speed="slow"
        />
      </div>
    </section>
  );
};

export default UserReview;
