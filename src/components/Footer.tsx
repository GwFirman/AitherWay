"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaPhone, FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer");
      if (footer) {
        const position = footer.getBoundingClientRect();
        setIsVisible(position.top <= window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const socialLinks = [
    { icon: <FaFacebookF />, href: "#", label: "Facebook" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaXTwitter />, href: "#", label: "Twitter" },
  ];

  return (
    <footer
      id="footer"
      className="bg-gray-900 text-white pt-12 overflow-hidden"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Brand Section */}
        <motion.div
          className={`col-span-1 sm:col-span-2 lg:col-span-1 ${inter.className}`}
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center space-x-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl font-semibold">AitherWay</span>
          </motion.div>
          <p className="text-sm text-gray-300 mb-6 max-w-sm">
            AitherWay is your ultimate travel companion, providing personalized
            itineraries and recommendations for your next adventure. Explore
            indonesia with us!
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="bg-slate-800 p-2.5 rounded-md hover:bg-rose-500 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants} className="col-span-1">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {["Home", "About Us", "Blog", "Contact"].map((link) => (
              <motion.li
                key={link}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href="#"
                  className="text-gray-300 hover:text-rose-500 transition-colors duration-300"
                >
                  {link}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Support Section */}
        <motion.div variants={itemVariants} className="col-span-1">
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            {["Contact", "Privacy Policy", "Terms of Service", "FAQ"].map(
              (link) => (
                <motion.li
                  key={link}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href="#"
                    className="text-gray-300 hover:text-rose-500 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </motion.li>
              )
            )}
          </ul>
        </motion.div>

        {/* Services Section */}
        <motion.div variants={itemVariants} className="col-span-1">
          <h4 className="text-lg font-semibold mb-4">Other Services</h4>
          <ul className="space-y-2">
            {["Tour List", "Tour Guide", "Travel Insurance", "Travel Blog"].map(
              (link) => (
                <motion.li
                  key={link}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href="#"
                    className="text-gray-300 hover:text-rose-500 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </motion.li>
              )
            )}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div variants={itemVariants} className="col-span-1">
          <h4 className="text-lg font-semibold mb-4">Talk To Us</h4>
          <ul className="space-y-3">
            {[
              { icon: <FaPhone />, text: "+62 123 4567" },
              { icon: <IoMail />, text: "support@aitherway.com" },
              { icon: <FaLocationDot />, text: "Purwokerto, Indonesia" },
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3 text-gray-300"
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-rose-500">{item.icon}</span>
                {item.text}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <motion.div
        className="border-t border-gray-800 mt-12 py-6 text-center"
        variants={itemVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <p className="text-sm text-gray-400">
          &copy; {year} AitherWay. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
