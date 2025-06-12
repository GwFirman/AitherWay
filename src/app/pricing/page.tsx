"use client";

import RecomendationNavbar from "@/components/RecomendationNavbar";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function PricingPage() {
  return (
    <div>
      <RecomendationNavbar />
      <div className="pt-12">
      <Pricing />
      <Footer />
      </div>
    </div>
  );
}
