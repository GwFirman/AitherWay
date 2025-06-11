"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Inter } from "next/font/google";
import SearchBot from "./ui/search-bot";
import axios from "axios";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const RecomendationNavbar = () => {
  const [location, setLocation] = useState<string>("Loading location...");
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const [searchResults, setSearchResults] = useState<any>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const formattedLocation = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setLocation(formattedLocation);
          setCoordinates({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation("Location access denied");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  const handleSearch = async (query: string) => {
    if (!coordinates) return;

    try {
      const response = await axios.post(
        'https://gwfirman-aitherway.hf.space/gradio_api/call/predict',
        {
          data: [query, location] // query = "Input user", location = "Lokasi user"
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      console.log("API Response:", response.data);
      setSearchResults(response.data);
          
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/80 ${inter.className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo and Search Section */}
          <div className="flex items-center gap-6 flex-1">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-slate-800">AitherWay</span>
            </Link>

            <SearchBot 
              onSearch={handleSearch}
              className="hidden md:block"
            />
          </div>

          <div className={`flex items-center gap-2 ${inter.className}`}>
            <MapPin size={20} className="text-pink-600" />
            <span className="text-sm font-medium text-slate-700">
              {location}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default RecomendationNavbar;