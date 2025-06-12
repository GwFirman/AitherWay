"use client";

import { useState, KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBot = ({
  onSearch,
  placeholder = "Search destinations, activities...",
  className = "",
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim()) {
      onSearch(searchValue);
      setSearchValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={`relative w-full max-w-xs sm:max-w-md md:max-w-lg ${className} ${inter.className}`}
    >
      <div className="flex items-center">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-4 pr-10 py-2 sm:pl-5 sm:pr-12 sm:py-3 md:py-4 rounded-full text-sm sm:text-base font-medium bg-slate-100 border border-transparent outline-none transition-all duration-300 ease-in-out placeholder:text-slate-500 hover:bg-white hover:ring-2 hover:ring-pink-500 hover:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />
        <button
          onClick={handleSearch}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 p-2 sm:p-3 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      </div>
    </div>
  );
};

export default SearchBot;