import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import { Inter } from "next/font/google";
import { Playwrite_DE_LA } from "next/font/google";
import { Nunito } from "next/font/google";

import { FaArrowRightLong } from "react-icons/fa6";

import Person from "@/images/Person.png";

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
  return (
    <section id="about-us" className="py-8 container mx-auto px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-2">
          {/* Left */}
          <div className="size-1/4 grow">
            <div className="relative h-full w-full rounded-lg p-4 bg-cover bg-no-repeat bg-center flex items-center justify-center">
              <div
                className="absolute z-10 w-4/5 h-[555px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
             bg-gradient-to-br from-teal-500 to-emerald-600
             rounded-t-[3rem] shadow-lg shadow-emerald-300/30"
              />
              {/* <div className="absolute z-30 bg-teal-50 rounded-3xl w-20 h-20 " /> */}
              <img
                src={Person.src}
                className="relative z-20 w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right */}
          <motion.div
            className="size-1/2 grow text-left mb-12 mt-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Title */}
            <motion.span
              className={`inline-block text-rose-500 text-xl font-medium ${playwrite.className}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              About Us
            </motion.span>

            {/* Sub-Title */}
            <motion.h2
              className={`text-4xl font-bold mt-4 leading-tight text-gray-800 ${nunito.className}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              We Help You Uncover{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Indonesia's Hidden Gems
              </span>{" "}
              Effortlessly and Enjoyably
            </motion.h2>

            {/* Description */}
            <motion.p
              className={`text-gray-600 mt-6 text-xl leading-relaxed ${inter.className}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
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

            {/* Badges Section */}
            <motion.ul
              className="mt-12 pl-4 grid grid-flow-col grid-rows-2 gap-4 text-xl text-gray-800 list-disc font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <li>Prompt-Based Travel Suggestions</li>
              <li>AI Curated Destination Picks</li>
              <li>Top 5 Personalized Recommendations</li>
              <li>Mapped Routes to Your Dream Getaway</li>
            </motion.ul>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button className="rounded-full mt-12 text-lg px-6 py-3 text-white bg-rose-500 hover:bg-rose-600 transition-colors duration-300 cursor-pointer items-center gap-2 ">
                More About Us <FaArrowRightLong />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
