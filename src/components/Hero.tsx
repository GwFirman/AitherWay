"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inter } from "next/font/google";
import { FaArrowRightLong } from "react-icons/fa6";

import BeachHero from "@/images/BeachHero.jpg";
import ElementArrow from "@/images/element/Arrow.png";
import PolaroidPhotoLombok from "@/images/PantaiPinkLombok.jpg";

interface HeroProps {
  backgroundImage?: string;
}

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const Hero: React.FC<HeroProps> = ({ backgroundImage }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const backGround = backgroundImage || BeachHero.src;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  const infoBarVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.8,
        ease: "easeOut",
      },
    },
  };

  const [show, setShow] = useState(false);
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `url(${backGround})`,
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="absolute inset-0 bg-gradient-to-t from-teal-800/50 to-transparent"
        ></motion.div>
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Content */}
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${inter.className}`}
        >
          <motion.div
            className="max-w-4xl text-center text-white"
            variants={itemVariants}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              variants={itemVariants}
            >
              Let <span className="text-rose-500">AI</span> Guide You to the
              Indonesian's Best-Kept{" "}
              <span className="text-cyan-400">Travel</span> Secrets
            </motion.h1>
            <div className="relative w-fit mx-auto">
              <motion.p
                className="text-lg mb-8 opacity-90"
                variants={itemVariants}
              >
                Plan your perfect getaway through smart prompts, live maps, and
                peaceful escapes.
              </motion.p>

              {/* Floating Arrow */}
              <motion.div
                className="absolute -left-48 -top-1 max-w-44"
                initial={{ opacity: 0, y: 40, rotate: -80, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, rotate: -60, scale: 0.95 }}
                transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
              >
                <img
                  src={ElementArrow.src}
                  className="w-full h-auto -rotate-0"
                  alt="Arrow"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="relative  p-[3.55px] max-w-2xl rounded-full mx-auto w-full">
          {show && (
            <motion.div
              animate={{ width: ["0%", "100%"], opacity: [0, 1] }}
              transition={{ duration: 0.5, type: "tween" }}
              className="rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 absolute inset-0"
            ></motion.div>
          )}
          <motion.div
            className="relative border border-indigo-600 bg-white rounded-full shadow-sm p-2 "
            variants={infoBarVariants}
          >
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-1">
                <motion.input
                  onHoverEnd={() => {
                    setShow(false);
                  }}
                  onHoverStart={() => {
                    setShow(true);
                  }}
                  type="text"
                  id="search"
                  name="search"
                  autoComplete="off"
                  placeholder="Ask AI your next destination…"
                  className={`w-full px-6 py-3 rounded-full text-base text-gray-700 placeholder-gray-40 outline-none ${inter.className}`}
                />
              </div>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={`bg-pink-600 text-white px-5 py-2.5 rounded-full font-medium cursor-pointer flex items-center gap-2 ${inter.className}`}
                onClick={() => (window.location.href = "")}
              >
                Try Now <FaArrowRightLong />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Floating Polaroid */}
        <motion.div
          className="absolute z-50 right-14 bottom-16 sm:bottom-24 md:bottom-32 justify-start hidden xl:flex"
          initial={{ opacity: 0, y: 60, rotate: -24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotate: -12, scale: 0.95 }}
          transition={{ delay: 1.4, duration: 0.7, ease: "easeOut" }}
        >
          <div className="w-[200px] h-[280px]">
            <div className="bg-white p-2 shadow-xl rounded-md w-full h-full flex items-center justify-center">
              <img
                src={PolaroidPhotoLombok.src}
                alt="Polaroid"
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default Hero;
