"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBot from "@/components/ui/search-bot";
import { useSearch } from "../../../contexts/SearchContext";
import { useRouter } from "next/navigation";
import logoText from "@/assets/logo/logo-slate.svg";

const logo = logoText;

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
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

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};

export default function NavBar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { fetchRecommendations, isLoading, location, coordinates, query, setQuery, setResults } = useSearch();

  const handleSearch = async (query: string) => {
    if (!coordinates) return;

    if (window.location.pathname !== "/recomendation") {
      setResults({ data: [] });
      return router.push(`/recomendation?q=${encodeURIComponent(query)}`);
    }

    try {
      fetchRecommendations(query, `${coordinates.lat},${coordinates.lng}`);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 right-0 left-0 z-50 h-20 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-lg`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex-shrink-0"
          >
            <Link
              href="/"
              className="text-xl font-bold text-slate-800 transition-colors hover:text-pink-600"
            >
              <Image src={logo} alt="Logo" width={160} height={60} />
            </Link>
          </motion.div>

          {/* Search Bot - Center aligned */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-4 max-w-xl flex-1 lg:mx-8"
          >
            <SearchBot
              onChange={setQuery}
              value={query}
              loading={isLoading}
              onSearch={handleSearch}
              className="w-full"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden shrink-0 items-center space-x-4 md:flex">
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
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-pink-50 hover:text-pink-600"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            {/* Location Badge */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="hidden flex-shrink-0 items-center gap-2 border-l border-slate-200 pl-4 lg:flex"
            >
              <MapPin size={18} className="text-pink-600" />
              <span className="max-w-[150px] text-sm font-medium text-slate-700">
                {location?.split(",")[0]}
              </span>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="rounded-lg p-2 transition-colors hover:bg-pink-50 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {isMenuOpen ? (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <X size={24} className="text-slate-700" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: 180 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Menu size={24} className="text-slate-700" />
              </motion.div>
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="border rounded-md bg-white border-slate-200/80 md:hidden"
            >
              <div className="space-y-4 px-4 py-6">
                {/* Mobile Location */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 border-b border-slate-100 pb-4"
                >
                  <MapPin size={18} className="text-pink-600" />
                  <span className="truncate text-sm font-medium text-slate-700">
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
                        className="block rounded-lg px-4 py-3 text-slate-700 transition-all duration-200 hover:bg-pink-50 hover:text-pink-600"
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
  );
}