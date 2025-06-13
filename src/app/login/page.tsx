"use client";

import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-fade";

import googleIcon from "@/assets/images/element/Google.png";
import facebookIcon from "@/assets/images/element/Facebook.png";
import twitterIcon from "@/assets/images/element/Twitter.png";
import ulunDanu from "@/assets/images/UlunDanuBaratanBali.jpg";
import nusaDua from "@/assets/images/NusaDuaBali.jpg";
import gunungRinjani from "@/assets/images/gunungRinjani.jpg";
import pantaiBalangan from "@/assets/images/PantaiBalangan.jpg";
import { signIn } from "next-auth/react";

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

const Login = () => {
	const fadeUp = {
		hidden: { opacity: 0, y: 32 },
		visible: (i = 1) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.15, duration: 0.8, ease: "easeInOut" },
		}),
	};

	return (
		<div className="mx-auto">
			<div className="flex h-screen flex-row">
				{/* Left */}
				<div className="relative h-screen w-2/6 overflow-hidden">
					<Swiper modules={[Autoplay, EffectFade]} effect="fade" autoplay={{ delay: 4500, disableOnInteraction: false }} loop allowTouchMove={false} navigation={false} pagination={false} className="h-full w-full">
						{carouselData.map((slide, idx) => (
							<SwiperSlide key={idx}>
								<div className="relative h-full w-full">
									<img src={slide.image.src} alt={slide.title} className="h-full w-full scale-105 object-cover transition-transform duration-1000 ease-in-out" style={{ filter: "brightness(0.85)" }} />
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-all duration-1000"></div>
									<div className="animate-fadeInUp absolute bottom-12 left-8 text-white">
										<h2 className="mb-2 text-2xl font-bold drop-shadow-lg">{slide.title}</h2>
										<p className="text-base drop-shadow">{slide.description}</p>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<div className="absolute top-6 left-8 z-10">
						<span className="animate-fadeInDown text-xl font-bold tracking-wide text-white drop-shadow-lg">AitherWay</span>
					</div>
				</div>

				{/* Right */}
				<div className="mx-auto flex w-1/2 items-center justify-center">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={{
							visible: { transition: { staggerChildren: 0.08 } },
						}}
						className="w-[400px] space-y-2"
					>
						{/* Welcome Text */}
						<motion.div variants={fadeUp} custom={1} className="space-y-2 text-center">
							<h1 className="text-2xl font-bold">Welcome Back, Explorer!</h1>
							<p className="text-sm text-gray-500">Log in to discover your next unforgettable destination.</p>
						</motion.div>

						{/* OAuth Buttons */}
						<motion.div variants={fadeUp} custom={1} className="relative top-8 flex flex-col space-y-2.5">
							<Button type="button" variant="outline" onClick={() => signIn("google")} className="w-full py-6 text-base">
								<img src={googleIcon.src} className="mr-8 h-5 w-5" />
								Sign in with Google
							</Button>

							<Button type="button" variant="outline" onClick={() => signIn("facebook")} className="w-full py-6 text-base">
								<img src={facebookIcon.src} className="mr-2 h-5 w-5" />
								Sign in with Facebook
							</Button>

							<Button type="button" variant="outline" onClick={() => signIn("twitter")} className="w-full py-6 text-base">
								<img src={twitterIcon.src} className="mr-2 h-5 w-5" />
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
