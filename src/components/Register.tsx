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

import googleIcon from "@/images/element/Google.png";
import {
  MdAlternateEmail,
  MdLock,
  MdPerson,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import ulunDanu from "@/images/UlunDanuBaratanBali.jpg";
import nusaDua from "@/images/NusaDuaBali.jpg";
import gunungRinjani from "@/images/gunungRinjani.jpg";
import pantaiBalangan from "@/images/PantaiBalangan.jpg";

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
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle register logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoogleRegister = () => {
    // Handle Google register logic here
    console.log("Google register clicked");
  };

  return (
    <div className="container mx-auto">
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
            className="w-[400px] space-y-8"
          >
            <motion.div
              variants={fadeUp}
              custom={1}
              className="space-y-2 text-center"
            >
              <h1 className="font-bold text-2xl">Create Your Account</h1>
              <p className="text-gray-500 text-sm">
                Register to start your unforgettable journey with us.
              </p>
            </motion.div>

            <motion.form
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.07 } },
              }}
              onSubmit={handleSubmit}
              className="space-y-2.5"
            >
              {/* <div className="relative">
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="px-4 py-6"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MdPerson size={20} />
                </span>
              </div> */}
              <motion.div variants={fadeUp} custom={2} className="relative">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="px-4 py-6"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MdAlternateEmail size={20} />
                </span>
              </motion.div>
              <motion.div variants={fadeUp} custom={3} className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="px-4 py-6"
                  required
                />
                <span
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility size={20} />
                  )}
                </span>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MdLock size={20} />
                </span>
              </motion.div>
              <motion.div variants={fadeUp} custom={4} className="relative">
                <Input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="px-4 py-6"
                  required
                />
                <span
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirm((prev) => !prev)}
                >
                  {showConfirm ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility size={20} />
                  )}
                </span>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MdLock size={20} />
                </span>
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={5}
                className="flex items-center gap-2"
              >
                <Checkbox
                  id="agree"
                  checked={formData.agree}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      agree: checked === true,
                    }))
                  }
                  className="border-gray-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  required
                />
                <label htmlFor="agree" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-500" target="_blank">
                    Terms & Conditions
                  </Link>
                </label>
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={6}
                className="relative flex flex-col space-y-2 top-8"
              >
                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 py-6 text-base"
                >
                  Register
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleRegister}
                  className="w-full py-6 text-base"
                >
                  <img
                    src={googleIcon.src}
                    alt="Google"
                    className="w-5 h-5 mr-2"
                  />
                  Sign up with Google
                </Button>
              </motion.div>
            </motion.form>

            <motion.p
              variants={fadeUp}
              custom={7}
              className="relative text-center text-sm top-12"
            >
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500">
                Login
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
