import { motion } from "framer-motion";

import { Inter } from "next/font/google";
import { Playwrite_DE_LA } from "next/font/google";

import Person from "@/images/Person.png"

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const playwrite = Playwrite_DE_LA({
  display: "swap",
});

const AboutUs = () => {
    return (
        <section id="about-us" className="py-8 container mx-auto px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-2">
          <div className="size-1/4 grow">
            <div className="h-full w-full rounded-lg p-4 bg-cover bg-no-repeat bg-center">
                <img 
                src={Person.src}
                className="bg-teal-600 rounded-t-3xl" 
                 />
            </div>
          </div>
          <div className="size-1/2 grow text-center mb-12">
            <span
              className={`text-rose-500 text-xl font-medium ${playwrite.className}`}
            >
              About Us
            </span>
            <h2 className={`text-3xl font-bold mt-2 ${inter.className}`}>
              lorem ipsum dolor sit amet consectetur
            </h2>
          </div>
        </div>
      </div>
    </section>
    );

};

export default AboutUs;