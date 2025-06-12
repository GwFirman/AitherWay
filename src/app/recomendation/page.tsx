"use client";

import RecomendationPage from "@/components/RecomendationPage";
import Footer from "@/components/Footer";

export default function RecomendationPlaces() {
	return (
		<>
			<RecomendationPage />
			<Footer />
		</>
	);
}

// "use client";
// import TravelCard from "@/components/TravelCard";
// import RecomendationNavbar from "@/components/RecomendationNavbar";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { MapPin } from "lucide-react";
// import { Inter } from "next/font/google";
// import SearchBot from "@/components/ui/search-bot";
// import axios from "axios";
// import { useSearchParams } from "next/navigation";

// const inter = Inter({
// 	weight: ["400", "500", "600", "700"],
// 	subsets: ["latin"],
// 	display: "swap",
// });

// const DashboardChat = () => {
// 	const [location, setLocation] = useState<string>("Loading location...");
// 	const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
// 	const [searchResults, setSearchResults] = useState<any>(null);
// 	const [loading, setLoading] = useState(true); // ✅ TAMBAH STATE LOADING
// 	const searchParams = useSearchParams();
// 	const q = searchParams.get("q");
// 	const [messages, setMessages] = useState<string[]>([]);

// 	const handleSearch = async (query: string) => {
// 		try {
// 			await fetchRecommendations(query);
// 		} catch (error) {
// 			console.error("Search error:", error);
// 		}
// 	};

// 	const fetchRecommendations = async (searchQuery?: string) => {
// 		try {
// 			setLoading(true); // ✅ SET LOADING TRUE
// 			const queryParams = new URLSearchParams();
// 			const finalQuery = searchQuery || q || "wisata";
// 			queryParams.append("q1", finalQuery);

// 			if (coordinates) {
// 				queryParams.append("q2", `${coordinates.lat},${coordinates.lng}`);
// 			} else if (location && location !== "Loading location..." && location !== "Location access denied" && location !== "Geolocation not supported") {
// 				queryParams.append("q2", location);
// 			} else {
// 				queryParams.append("q2", "purwokerto");
// 			}

// 			const response = await fetch(`/api/recomendation?${queryParams.toString()}`);
// 			if (!response.body) {
// 				console.error("Tidak ada response body");
// 				setLoading(false); // ✅ SET LOADING FALSE MESKI GAGAL
// 				return;
// 			}

// 			const reader = response.body.getReader();
// 			const decoder = new TextDecoder("utf-8");
// 			let buffer = "";

// 			while (true) {
// 				const { done, value } = await reader.read();
// 				if (done) break;
// 				buffer += decoder.decode(value, { stream: true });
// 				const parts = buffer.split("\n\n");
// 				buffer = parts.pop() || "";
// 				for (const part of parts) {
// 					const lines = part.split("\n");
// 					const dataLine = lines.find((line) => line.startsWith("data:"));
// 					if (dataLine) {
// 						const data = dataLine.replace(/^data:\s*/, "");
// 						try {
// 							const parsedData = JSON.parse(data);
// 							if (Array.isArray(parsedData) && parsedData.length > 1) {
// 								setSearchResults(parsedData[1]);
// 							}
// 						} catch {
// 							setMessages((prev) => [...prev, data]);
// 						}
// 					}
// 				}
// 			}
// 			setLoading(false); // ✅ SET LOADING FALSE SAAT SELESAI
// 		} catch (error) {
// 			console.error("Fetch recommendations error:", error);
// 			setLoading(false); // ✅ SET LOADING FALSE SAAT ERROR
// 		}
// 	};

// 	useEffect(() => {
// 		if ("geolocation" in navigator) {
// 			navigator.geolocation.getCurrentPosition(
// 				(position) => {
// 					const { latitude, longitude } = position.coords;
// 					setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
// 					setCoordinates({ lat: latitude, lng: longitude });
// 				},
// 				() => {
// 					setLocation("Location access denied");
// 				},
// 				{
// 					enableHighAccuracy: true,
// 					timeout: 5000,
// 					maximumAge: 0,
// 				}
// 			);
// 		} else {
// 			setLocation("Geolocation not supported");
// 		}
// 	}, []);

// 	useEffect(() => {
// 		if (q) {
// 			handleSearch(q);
// 		}
// 	}, [q]);

// 	useEffect(() => {
// 		if (!q && (coordinates || (location && location !== "Loading location..." && location !== "Location access denied" && location !== "Geolocation not supported"))) {
// 			fetchRecommendations();
// 		}
// 	}, [coordinates, location, q]);

// 	return (
// 		<div className="relative">
// 			<div>
// 				<nav className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/80 ${inter.className}`}>
// 					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// 						<div className="flex items-center justify-between h-24">
// 							<div className="flex items-center gap-6 flex-1">
// 								<Link href="/" className="flex-shrink-0 flex items-center">
// 									<span className="text-xl font-bold text-slate-800">AitherWay</span>
// 								</Link>
// 								<SearchBot onSearch={handleSearch} className="hidden md:block" />
// 							</div>
// 							<div className={`flex items-center gap-2 ${inter.className}`}>
// 								<MapPin size={20} className="text-pink-600" />
// 								<span className="text-sm font-medium text-slate-700">{location}</span>
// 							</div>
// 						</div>
// 					</div>
// 				</nav>
// 			</div>
// 			<div className="pt-24">
// 				<TravelCard searchResults={searchResults} loading={loading} />
// 			</div>
// 		</div>
// 	);
// };

// export default DashboardChat;
