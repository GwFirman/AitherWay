"use client";

import TravelCard from "@/components/TravelCard";
import RecomendationNavbar from "@/components/RecomendationNavbar";

export default function RecomendationPage() {
  return (
    <div className="relative">
      <div>
        <RecomendationNavbar />
      </div>
      <div className="pt-20 pb-12">
        <TravelCard />
      </div>
    </div>
  );
}
