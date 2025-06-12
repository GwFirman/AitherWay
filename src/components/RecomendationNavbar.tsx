"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, X, Menu } from "lucide-react";
import { Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import SearchBot from "./ui/search-bot";
import axios from "axios";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Recomendation by AI", href: "/recomendation" },
];

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.6, 0.6, 0.6],
    },
  },
};

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const RecomendationNavbar = () => {
  const [location, setLocation] = useState<string>("Loading location...");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const getLocation = () => {
      if (!navigator.geolocation) {
        setLocation("Geolocation not supported by your browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setCoordinates({ lat: latitude, lng: longitude });
        },
        (error) => {
          setLocation("Location access failed");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    };

    getLocation();
  }, []);

  const handleSearch = async (query: string) => {
    if (!coordinates) return;

    try {
      const response = await axios.post(
        "https://gwfirman-aitherway.hf.space/gradio_api/call/predict",
        {
          data: [query, location], // query = "Input user", location = "Lokasi user"
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("API Response:", response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="visible"
          className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/80 shadow-sm ${inter.className}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Logo */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex-shrink-0"
              >
                <Link
                  href="/"
                  className="text-xl font-bold text-slate-800 hover:text-pink-600 transition-colors"
                >
                  AitherWay
                </Link>
              </motion.div>

              {/* Search Bot - Center aligned */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 max-w-xl mx-4 lg:mx-8"
              >
                <SearchBot onSearch={handleSearch} className="w-full" />
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Link
                      href={item.href}
                      className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Location Badge */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-200"
                >
                  <MapPin size={18} className="text-pink-600" />
                  <span className="text-sm font-medium text-slate-700 truncate max-w-[150px]">
                    {location}
                  </span>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 rounded-lg hover:bg-pink-50 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {isMenuOpen ? (
                  <X size={24} className="text-slate-700" />
                ) : (
                  <Menu size={24} className="text-slate-700" />
                )}
              </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence mode="wait">
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden border-t border-slate-200/80"
                >
                  <div className="px-4 py-6 space-y-4">
                    {/* Mobile Location */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 pb-4 border-b border-slate-100"
                    >
                      <MapPin size={18} className="text-pink-600" />
                      <span className="text-sm font-medium text-slate-700 truncate">
                        {location}
                      </span>
                    </motion.div>

                    {/* Mobile Navigation Links */}
                    <div className="space-y-2">
                      {menuItems.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-3 rounded-lg text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200"
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default RecomendationNavbar;

function setSearchResults(data: any) {
  throw new Error("Function not implemented.");
}
