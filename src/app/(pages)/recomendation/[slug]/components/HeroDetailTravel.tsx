"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

type HeroDetailTravelProps = {
  data: {
    gambar?: string;
    nama?: string;
    alamat?: string;
  };
  width?: number;
  height?: number;
};

function upgradeImageResolution(url: string, width = 1920, height = 960): string {
  return url.replace(/w\d+-h\d+/g, `w${width}-h${height}`);
}

export const HeroDetailTravel = ({ data, width, height }: HeroDetailTravelProps) => {
  const imageUrl = data?.gambar
    ? upgradeImageResolution(data.gambar, width, height)
    : "/placeholder-image.jpg";

  return (
    <div className="relative w-full h-80 sm:h-96 md:h-[500px] overflow-hidden">
  <Image
    src={imageUrl}
    alt={data?.nama ?? "Tempat Wisata"}
    fill
    className="object-cover aspect-[16/9]"
    priority
  />

  <motion.div 
    className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/50 via-black/20 to-transparent"
    initial={{ opacity: 0, y: 50 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
  >
    <div className="max-w-7xl mx-auto">
      <motion.h1 
        className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2"
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {data?.nama ?? "Tempat Wisata"}
      </motion.h1>
      
      <motion.div 
        className="flex items-center gap-2 text-white"
        initial={{ opacity: 0, x: -30 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <MapPin className="w-5 h-5" />
        <span className="text-lg">{data?.alamat ?? "Alamat belum tersedia"}</span>
      </motion.div>
    </div>
  </motion.div>
</div>
  );
};

export default HeroDetailTravel;