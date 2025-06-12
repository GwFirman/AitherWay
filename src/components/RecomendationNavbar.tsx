"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import SearchBot from "./ui/search-bot";
import axios from "axios";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import HamburgerButton from "@/components/ui/hamburger";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.6, 0.6, 0.6, 0.6] },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const menuItemVariants = {
  hidden: { y: -10, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const RecomendationNavbar = () => {
  const [location, setLocation] = useState<string>("Loading location...");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);

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

  const activitiesList = [
    {
      href: "/activities/hiking",
      label: "Hiking",
      desc: "Nikmati jalur pendakian terbaik dengan pemandangan alam yang memukau.",
    },
    {
      href: "/activities/camping",
      label: "Camping",
      desc: "Temukan lokasi berkemah terbaik di pegunungan dan tepi danau.",
    },
    {
      href: "/activities/sightseeing",
      label: "Sightseeing",
      desc: "Jelajahi destinasi ikonik dan panorama kota yang menakjubkan.",
    },
    {
      href: "/activities/culinary",
      label: "Culinary",
      desc: "Cicipi hidangan lokal yang autentik dan kuliner khas daerah.",
    },
    {
      href: "/activities/nature-walks",
      label: "Nature Walks",
      desc: "Rileks sejenak sambil berjalan di tengah pepohonan dan udara segar.",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsActivitiesOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200/80 shadow-sm ${inter.className}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Logo */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex-shrink-0"
              >
                <Link
                  href="/"
                  className="text-xl font-bold text-slate-800"
                >
                  AitherWay
                </Link>
              </motion.div>

              {/* Desktop Search - Hidden on mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden lg:flex flex-1 max-w-xl mx-6"
              >
                <SearchBot onSearch={handleSearch} className="w-full" />
              </motion.div>

              {/* Mobile Search - Only visible on tablet and mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 max-w-xs mx-4 lg:hidden"
              >
                <SearchBot onSearch={handleSearch} className="w-full" />
              </motion.div>

              {/* Desktop Navigation Menu */}
              <NavigationMenu className="hidden lg:flex items-center justify-center text-slate-700">
                <ul className="flex items-center gap-2 text-sm">
                  <Link
                    href="/"
                    className="flex items-center h-10 px-4 py-2 rounded-md hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  >
                    Home
                  </Link>
                  {["Destinations", "Activities"].map((item, i) => (
                    <motion.li
                      key={item}
                      custom={i}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      className="list-none"
                    >
                      <NavigationMenuItem>
                        {item === "Activities" ? (
                          <div>
                            <NavigationMenuTrigger className="h-10 px-4 py-2 rounded-md data-[state=open]:bg-pink-50 hover:bg-pink-50 hover:text-pink-600 transition-colors text-sm">
                              {item}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              <ul className="w-[280px] bg-white p-4 rounded-lg grid gap-2">
                                {activitiesList.map((activity) => (
                                  <motion.li
                                    key={activity.href}
                                    whileHover={{ x: 5 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 200,
                                    }}
                                    className="list-none"
                                  >
                                    <Link
                                      href={activity.href}
                                      className="flex items-start gap-3 p-3 rounded-md hover:bg-pink-50 transition-colors group text-sm"
                                    >
                                      <div className="flex-1">
                                        <div className="font-medium text-slate-700 group-hover:text-pink-600 transition-colors">
                                          {activity.label}
                                        </div>
                                        <div className="text-sm text-slate-500 line-clamp-2">
                                          {activity.desc}
                                        </div>
                                      </div>
                                    </Link>
                                  </motion.li>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </div>
                        ) : (
                          <Link
                            href={`/${item.toLowerCase()}`}
                            className="flex items-center h-10 px-4 py-2 rounded-md hover:bg-pink-50 hover:text-pink-600 transition-colors text-sm"
                          >
                            {item}
                          </Link>
                        )}
                      </NavigationMenuItem>
                    </motion.li>
                  ))}
                </ul>
              </NavigationMenu>

              {/* Location - Hidden on small screens */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="hidden sm:flex items-center gap-2 flex-shrink-0 ml-4"
              >
                <MapPin size={18} className="text-pink-600" />
                <span className="text-xs sm:text-sm font-medium text-slate-700 whitespace-nowrap max-w-[120px] lg:max-w-none truncate">
                  {location}
                </span>
              </motion.div>

              {/* Hamburger Menu Button */}
              <div className="lg:hidden">
                <HamburgerButton
                  open={isMobileMenuOpen}
                  onClick={toggleMobileMenu}
                />
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  variants={mobileMenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="lg:hidden overflow-hidden bg-white border-t border-slate-200/80"
                >
                  <div className="px-4 py-6 space-y-4">
                    {/* Mobile Location */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-2 pb-4 border-b border-slate-100 sm:hidden"
                    >
                      <MapPin size={16} className="text-pink-600" />
                      <span className="text-sm font-medium text-slate-700 truncate">
                        {location}
                      </span>
                    </motion.div>

                    {/* Mobile Navigation Links */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-2"
                    >
                      <Link
                        href="/"
                        onClick={closeMobileMenu}
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors text-slate-700 font-medium"
                      >
                        Home
                      </Link>
                      <Link
                        href="/destinations"
                        onClick={closeMobileMenu}
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors text-slate-700 font-medium"
                      >
                        Destinations
                      </Link>
                      
                      {/* Activities Accordion */}
                      <div className="space-y-2">
                        <button
                          onClick={() => setIsActivitiesOpen(!isActivitiesOpen)}
                          className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors text-slate-700 font-medium"
                        >
                          Activities
                          <motion.div
                            animate={{
                              rotate: isActivitiesOpen ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="6,9 12,15 18,9"></polyline>
                            </svg>
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {isActivitiesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden ml-4 space-y-1"
                            >
                              {activitiesList.map((activity, index) => (
                                <motion.div
                                  key={activity.href}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <Link
                                    href={activity.href}
                                    onClick={closeMobileMenu}
                                    className="flex flex-col px-4 py-3 rounded-lg hover:bg-pink-50 transition-colors group"
                                  >
                                    <span className="font-medium text-slate-700 group-hover:text-pink-600 transition-colors text-sm">
                                      {activity.label}
                                    </span>
                                    <span className="text-xs text-slate-500 mt-1 line-clamp-2">
                                      {activity.desc}
                                    </span>
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
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