"use client";

import TravelCard from "@/components/TravelCard";
import RecomendationNavbar from "@/components/RecomendationNavbar";

const DashboardChat = () => {
  return (
    <div className="relative">
      <div>
        <RecomendationNavbar />
      </div>
      <div className="pt-20">
        <TravelCard />
        </div>
    </div>
  );
};

export default DashboardChat;
