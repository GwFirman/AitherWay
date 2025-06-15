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

const defaultTestimonialsA: Testimonial[] = [
  {
    quote: "Amazing experience! The AI recommendations were spot-on for our Bali trip.",
    name: "Sarah Johnson",
    title: "Travel Blogger",
  },
  {
    quote: "Found incredible hidden gems in Raja Ampat thanks to this platform.",
    name: "Michael Chen",
    title: "Adventure Seeker",
  },
  {
    quote: "The local insights made our Indonesian journey truly special.",
    name: "Emma Wilson",
    title: "Cultural Enthusiast",
  },
  {
    quote: "The itinerary suggestions were perfect for our family vacation in Bali.",
    name: "David Smith",
    title: "Family Traveler",
  },
  {
    quote: "I loved the personalized recommendations! It made my trip to Indonesia unforgettable.",
    name: "Sophia Brown",
    title: "Solo Traveler",
  },
  {
    quote: "The user-friendly interface and AI-driven suggestions made planning a breeze.",
    name: "James Taylor",
    title: "Tech Enthusiast",
  },
  {
    quote: "I just typed 'calm waterfall near me'—AitherWay did the rest. Amazing!",
    name: "Lia Rahman",
    title: "Nature Lover",
  },
  {
    quote: "No need to scroll endlessly—this site just gets what I want.",
    name: "Jonathan Lee",
    title: "Busy Professional",
  },
  {
    quote: "As a student, it helped me find budget-friendly destinations fast.",
    name: "Putri Andini",
    title: "Student Explorer",
  },
  {
    quote: "Every recommendation felt like it was handpicked for me.",
    name: "Carlos Mendes",
    title: "Photographer",
  },
];

const defaultTestimonialsB: Testimonial[] = [
  {
    quote: "AitherWay helped us find peaceful places away from tourist crowds.",
    name: "Amira Santoso",
    title: "Peace Seeker",
  },
  {
    quote: "The AI felt like a real travel buddy—so intuitive and helpful.",
    name: "Leo Nakamura",
    title: "Frequent Traveler",
  },
  {
    quote: "From cheap eats to hidden beaches, this site is a goldmine!",
    name: "Maya Rizky",
    title: "Backpacker",
  },
  {
    quote: "Perfect tool for spontaneous weekend getaways!",
    name: "Derek Hall",
    title: "Urban Nomad",
  },
  {
    quote: "I recommended it to all my friends—it’s just that good.",
    name: "Nadia Fitri",
    title: "Social Traveler",
  },
  {
    quote: "Didn’t expect AI to understand ‘aesthetic cafe near forest’—but it did.",
    name: "Zara Kusuma",
    title: "Content Creator",
  },
  {
    quote: "Smooth experience and surprisingly accurate suggestions!",
    name: "Riko Ananta",
    title: "Trip Planner",
  },
  {
    quote: "This app saved us time and stress during our honeymoon.",
    name: "Yasmine Patel",
    title: "Honeymooner",
  },
  {
    quote: "Helps me discover my own country in a new light.",
    name: "Budi Prasetyo",
    title: "Local Explorer",
  },
  {
    quote: "The recommendations aligned perfectly with my mood and budget.",
    name: "Inez Wulandari",
    title: "Minimalist Traveler",
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
          className={`text-3xl font-bold mt-2 text-gray-800 ${inter.className}`}
        >
          What Our Users Say
        </h2>
        <p className={`text-gray-600 mt-4 max-w-2xl mx-auto ${inter.className}`}>
          Discover Indonesia's top-rated destinations from tranquil lakes to vibrant beaches all handpicked for you by our smart travel assistant.
        </p>
      </motion.div>
      <div className="rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={defaultTestimonialsA}
          direction="right"
          speed="slow"
        />
        <InfiniteMovingCards
          items={defaultTestimonialsB}
          direction="left"
          speed="slow"
        />
      </div>
    </section>
  );
};

export default UserReview;
