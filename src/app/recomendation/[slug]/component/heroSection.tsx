"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";

type HeroSectionProps = {
  data: {
    gambar?: string;
    nama?: string;
    alamat?: string;
  };
  width?: number;
  height?: number;
};

function upgradeImageResolution(
  url: string,
  width = 1920,
  height = 960
): string {
  return url.replace(/w\d+-h\d+/g, `w${width}-h${height}`);
}

export const HeroSection = ({ data, width, height }: HeroSectionProps) => {
  const imageUrl = data?.gambar
    ? upgradeImageResolution(data.gambar, width, height)
    : "/placeholder-image.jpg";

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden">
      <Image
        src={imageUrl}
        alt={data?.nama ?? "Tempat Wisata"}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/50 via-black/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
            {data?.nama ?? "Tempat Wisata"}
          </h1>
          <div className="flex items-center gap-2 text-white">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">{data?.alamat ?? "Alamat belum tersedia"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
