"use client";

import { motion } from "framer-motion";
import { Star, Ticket, MapPin, Users } from "lucide-react";

type PlaceDetailsProps = {
  data: {
    deskripsi?: string;
    rating?: string;
    total_ulasan?: number;
    harga?: string;
    jarak_km?: string;
    map_url?: string;
  };
};

const getRatingAsNumber = (rating?: string) => {
  const num = parseFloat(rating || "0");
  return isNaN(num) ? 0 : num;
};

// Render rating stars
const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`w-5 h-5 ${
        index < Math.floor(rating)
          ? "text-yellow-400 fill-current"
          : index < rating
          ? "text-yellow-400 fill-current opacity-50"
          : "text-gray-300"
      }`}
    />
  ));
};

export const PlaceDetails = ({ data }: PlaceDetailsProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white rounded-xl p-6 md:p-8 h-full shadow-lg border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Tentang Tempat Ini
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {data.deskripsi ||
                  "Deskripsi tempat wisata ini belum tersedia. Namun, tempat ini menawarkan pengalaman wisata yang menarik dan tak terlupakan untuk dikunjungi bersama keluarga dan teman-teman."}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Rating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center">
                  {renderStars(getRatingAsNumber(data.rating))}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {data.rating || 0}/5
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <Users className="w-4 h-4" />
                {data.total_ulasan || 0} ulasan
              </div>
            </motion.div>

            {/* Price Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <Ticket className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">
                  Harga Tiket
                </span>
              </div>
              {data.harga ? (
                <div className="text-2xl font-bold text-green-600 ">
                  {data.harga}
                </div>
              ) : (
                <div className="text-gray-400 text-sm">Data belum tersedia</div>
              )}
              <div className="text-sm text-gray-600">per orang</div>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-600">
                  Jarak lokasi
                </span>
              </div>
              {data.jarak_km ? (
                <div className="text-2xl font-bold text-blue-500 ">
                  {data.jarak_km}
                </div>
              ) : (
                <div className="text-gray-400 text-sm">Tidak tersedia</div>
              )}
              <div className="text-sm text-gray-600">dari lokasi pencarian</div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-2 pt-2 border-t border-gray-100"
          >
            <a
              href={data.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full bg-rose-600 hover:bg-rose-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Lihat Lokasi di Peta
            </a>

            <button className="w-full mt-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
              Simpan ke Wishlist
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
