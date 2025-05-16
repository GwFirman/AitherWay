'use client';

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrendingDestination from "@/components/TrendingDestination";

export default function Home() {
  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Explore", href: "#explore" },
    { label: "Ask Ai" , href: "#askAi" },
    { label: "About", href: "#about" },
  ];

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

    // Handle initial hash (if any)
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
      <Navbar logoText="AitherWay" menuItems={menuItems} />
      <main className="overflow-hidden">
        <Hero />
        <TrendingDestination />
      </main>
    </>
  );
};