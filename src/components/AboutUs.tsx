import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import { Inter } from "next/font/google";
import { Playwrite_DE_LA } from "next/font/google";
import { Nunito } from "next/font/google";

import { FaArrowRightLong } from "react-icons/fa6";

import Person from "@/images/Person.png";
import Link from "next/link";

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
    // Add intersection observer to trigger animations when section is in view
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
          <motion.div
            className="w-full lg:w-2/5 lg:flex justify-center items-center hidden"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] aspect-[3/4]">
              <div
                className="absolute z-10 w-[85%] h-[95%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                bg-gradient-to-br from-teal-500 to-emerald-600
                rounded-t-[3rem] shadow-lg shadow-emerald-300/30"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <img
                  src={Person.src}
                  alt="Person illustration"
                  className="w-full h-full object-contain md:mt-1.5"
                />
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="w-full lg:w-3/5 text-left"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Title */}
            <motion.span
              className={`inline-block text-rose-500 text-lg sm:text-xl font-medium ${playwrite.className}`}
              variants={variants}
              transition={{ delay: 0.3 }}
            >
              About Us
            </motion.span>

            {/* Sub-Title */}
            <motion.h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 leading-tight text-gray-800 ${nunito.className}`}
              variants={variants}
              transition={{ delay: 0.4 }}
            >
              We Help You Uncover{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Indonesia's Hidden Gems
              </span>{" "}
              Effortlessly and Enjoyably
            </motion.h2>

            {/* Description */}
            <motion.p
              className={`text-gray-600 mt-4 text-base sm:text-lg leading-relaxed ${inter.className}`}
              variants={variants}
              transition={{ delay: 0.5 }}
            >
              AitherWay is an AI-powered travel assistant that helps you find
              your perfect destination—just by asking. Whether you're dreaming
              of a quiet escape, a scenic adventure, or a budget-friendly
              getaway, simply tell us what you're looking for. Our AI will
              respond with personalized location picks, mapped routes, and the
              top 5 recommendations tailored to your preferences. Say goodbye to
              endless searching—AitherWay makes discovering Indonesia
              beautifully simple.
            </motion.p>

            {/* List */}
            <motion.ul
              className="mt-8 lg:mt-4 pl-4 grid grid-cols-1 sm:grid-cols-2 sm:gap-3 md:gap-4 lg:gap-6 text-base sm:text-lg lg:text-xl text-gray-800 list-disc font-semibold"
              variants={variants}
              transition={{ delay: 0.6 }}
            >
              <li>Prompt-Based Travel Suggestions</li>
              <li>AI Curated Destination Picks</li>
              <li>Top 5 Personalized Recommendations</li>
              <li>Mapped Routes to Your Dream Getaway</li>
            </motion.ul>

            {/* Button */}
            <motion.div variants={variants} transition={{ delay: 0.7 }}>
              <Button className="rounded-full mt-8 lg:mt-6 text-base sm:text-lg px-6 py-4 sm:py-5 text-white bg-rose-500 hover:bg-rose-500 shadow-sm cursor-pointer flex items-center gap-2">
                <Link href="/login" className="flex items-center gap-2">
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
