"use client"

import { useEffect } from "react";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrendingDestination from "@/components/TrendingDestination";
import AboutUs from "@/components/AboutUs";
import UserReview from "@/components/UserReview";
import Footer from "@/components/Footer";

import PolaroidPhotoMbuluk from "@/images/PantaiMbuluk.jpg";

export default function LandingPage() {
    
  useEffect(() => {
    // Smooth scroll to anchor links
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
        <Navbar />
        <main className="overflow-hidden">
          <Hero />

          {/* Floating Polaroid */}
          <motion.div
            className="absolute z-50 bottom-52 left-24 mx-auto hidden justify-start xl:flex"
            initial={{ opacity: 0, y: 60, rotate: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, rotate: -12, scale: 0.95 }}
            transition={{ delay: 1.6, duration: 0.7, ease: "easeOut" }}
          >
            <div className="absolute w-[200px] h-[280px] rotate-18 scale-95">
              <div className="bg-white p-2 shadow-md rounded-md w-full h-full flex items-center justify-center">
                <img
                  src={PolaroidPhotoMbuluk.src}
                  alt="Polaroid"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
          </motion.div>
          {/* End Floating Polaroid */}

          <TrendingDestination />
          <AboutUs />
          <UserReview />
          <Footer />
        </main>
    </>
  )
};