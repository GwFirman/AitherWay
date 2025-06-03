"use client";

import React, { FormEvent, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import Link from "next/link";

import googleIcon from "@/assets/images/element/Google.png";
import azureIcon from "@/assets/images/element/Azure.png";
import facebookIcon from "@/assets/images/element/Facebook.png"
import twitterIcon from "@/assets/images/element/Twitter.png"
import appleIcon from "@/assets/images/element/Apple.png"
import {
  MdAlternateEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import ulunDanu from "@/assets/images/UlunDanuBaratanBali.jpg";
import nusaDua from "@/assets/images/NusaDuaBali.jpg";
import gunungRinjani from "@/assets/images/gunungRinjani.jpg";
import pantaiBalangan from "@/assets/images/PantaiBalangan.jpg";
import { createClient } from "@/utils/supabase/client";

const carouselData = [
  {
    image: ulunDanu,
    title: "Peaceful Lakeside",
    description: "Find calm at Bali's floating temple.",
  },
  {
    image: nusaDua,
    title: "Tropical Escape",
    description: "Soak in the sun at Nusa Dua's clear shores.",
  },
  {
    image: gunungRinjani,
    title: "Chase the Heights",
    description: "Adventure awaits on Mount Rinjani.",
  },
  {
    image: pantaiBalangan,
    title: "Hidden Paradise",
    description: "Discover quiet waves at Balangan Beach.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: "easeInOut" },
  }),
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOAuthLogin = (provider: 'google' | 'facebook' | 'apple' | 'twitter') => {
    createClient().auth.signInWithOAuth({ provider });
  };

  return (
    <div className="mx-auto">
      <div className="flex flex-row h-screen">
        {/* Left */}
        <div className="relative w-2/6 h-screen overflow-hidden">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop
            allowTouchMove={false}
            navigation={false}
            pagination={false}
            className="w-full h-full"
          >
            {carouselData.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <div className="w-full h-full relative">
                  <img
                    src={slide.image.src}
                    alt={slide.title}
                    className="object-cover w-full h-full transition-transform duration-1000 ease-in-out scale-105"
                    style={{ filter: "brightness(0.85)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-all duration-1000"></div>
                  <div className="absolute bottom-12 left-8 text-white animate-fadeInUp">
                    <h2 className="text-2xl font-bold drop-shadow-lg mb-2">
                      {slide.title}
                    </h2>
                    <p className="text-base drop-shadow">{slide.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-6 left-8 z-10">
            <span className="font-bold text-xl text-white drop-shadow-lg tracking-wide animate-fadeInDown">
              AitherWay
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center items-center w-1/2 mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="w-[400px] space-y-2"
          >
            {/* Welcome Text */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="space-y-2 text-center"
            >
              <h1 className="font-bold text-2xl">Welcome Back, Explorer!</h1>
              <p className="text-gray-500 text-sm">
                Log in to discover your next unforgettable destination.
              </p>
            </motion.div>

            {/* OAuth Buttons */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="relative flex flex-col space-y-2.5 top-8"
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthLogin('google')}
                className="w-full py-6 text-base"
              >
                <img src={googleIcon.src} className="w-5 h-5 mr-8" />
                Sign in with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthLogin('facebook')}
                className="w-full py-6 text-base"
              >
                <img src={facebookIcon.src} className="w-5 h-5 mr-2" />
                Sign in with Facebook
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthLogin('twitter')}
                className="w-full py-6 text-base"
              >
                <img src={twitterIcon.src} className="w-5 h-5 mr-2" />
                Sign in with Twitter
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
