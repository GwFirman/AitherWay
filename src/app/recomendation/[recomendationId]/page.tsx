"use client";

import { useSearchParams } from "next/navigation";
import RecomendationNavbar from "@/components/RecomendationNavbar";

export default function RecomendationDetailPage() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title");

  if (!title) return <div>Data tidak ditemukan.</div>;

  return (
    <div className="max-w7xl ">
        <RecomendationNavbar />
      <h1 className="text-3xl font-bold mt-24  ">{title}</h1>
    </div>
  );
}
