import { motion } from "framer-motion";

import { Inter } from "next/font/google";
import { Playwrite_DE_LA } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const playwrite = Playwrite_DE_LA({
  display: "swap",
});

const UserReview = () => {
  return (
    <section id="user-review" className="py-8 container mx-auto px-4">
    </section>
  );
};

export default UserReview;
