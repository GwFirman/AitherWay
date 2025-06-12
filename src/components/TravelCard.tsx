import { MapPin } from "lucide-react";
import Image from "next/image";
import { FaCircle, FaRegCircle, FaAdjust } from "react-icons/fa";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const travelData = [
	{
		id: 1,
		title: "Curug Lima Semaya",
		location: "Central Java",
		price: "Free",
		rating: 4.8,
		reviewers: "(1.4K+ reviews)",
		description: "Curug Lima Semaya is a beautiful multi-tiered waterfall nestled in Central Java's lush tropical forest. With relatively easy access and a peaceful natural atmosphere, it’s perfect for those seeking tranquility and scenic views. Surrounded by dense greenery and fresh air, it offers a refreshing escape from the city.",
	},
	{
		id: 2,
		title: "Curug Kalidatar",
		location: "Central Java",
		price: "Rp10,000",
		rating: 4.9,
		reviewers: "(800+ reviews)",
		description: "Curug Kalidatar offers a stunning waterfall landscape with crystal-clear water and natural rock formations. It’s an ideal spot for weekend relaxation, family picnics, or playing in the water. The unspoiled surroundings make this destination a hidden gem for nature lovers.",
	},
	{
		id: 3,
		title: "Kedung Jayub Natural Spring",
		location: "Central Java",
		price: "Rp15,000",
		rating: 4.7,
		reviewers: "(1.2K+ reviews)",
		description: "Kedung Jayub is a natural spring pool formed by a flowing river through rocky terrain. It’s a great place for swimming, water play, and soaking in the refreshing vibes of nature. Loved by local travelers, it’s a peaceful spot for unwinding and reconnecting with the outdoors.",
	},
	{
		id: 4,
		title: "Curug Nangga",
		location: "Central Java",
		price: "Rp20,000",
		rating: 4.6,
		reviewers: "(900+ reviews)",
		description: "Famous for its unique seven-tiered waterfall, Curug Nangga offers a breathtaking view and a challenging trek through nature. The cool mountain air and impressive landscape make it a favorite for hikers and photography enthusiasts looking for hidden natural treasures.",
	},
	{
		id: 5,
		title: "Logending Beach",
		location: "Central Java",
		price: "Rp25,000",
		rating: 4.8,
		reviewers: "(600+ reviews)",
		description: "Logending Beach features a wide coastal stretch with stunning sea views and natural cliff formations. With calm waves, it’s perfect for family visits, fishing, or simply watching the sunset. Traditional fishing boats add an authentic local charm to the beach’s serene atmosphere.",
	},
];

function renderCircles(rating: number) {
	const circles = [];

	for (let i = 1; i <= 5; i++) {
		const diff = rating - (i - 1);

		if (diff >= 1) {
			circles.push(<FaCircle key={i} className="text-rose-500 size-4" />);
		} else if (diff >= 0.25 && diff <= 0.75) {
			circles.push(<FaAdjust key={i} className="text-rose-500 size-4" />);
		} else if (diff > 0) {
			circles.push(<FaAdjust key={i} className="text-rose-500 size-4 opacity-70" />);
		} else {
			circles.push(<FaRegCircle key={i} className="text-rose-500" size={18} />);
		}
	}

	return circles;
}

const TravelCard = () => {
	return (
		<div className="flex flex-col gap-6 px-4 py-6">
			{travelData.map(({ id, title, price, rating, reviewers, location, description }) => (
				<div key={id} className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-sm flex flex-col xl:flex-row overflow-hidden">
					<div className="w-full xl:w-[320px] flex-shrink-0 relative h-48 xl:h-auto bg-gradient-to-br from-green-500 via-teal-400 to-sky-300 overflow-hidden group">
						<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
						<div className="absolute inset-0 bg-pattern opacity-10 z-0"></div>
					</div>

					<div className="flex-1 p-6 xl:p-8 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50/50">
						<div>
							{/* Header section */}
							<div className="flex flex-col">
								<div className="text-rose-400/80 text-md font-medium tracking-wider">{id.toString().padStart(2, "0")}</div>
								<h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
									<Link
										href={{
											pathname: `/recomendation/${id}`,
											query: {
												title,
											},
										}}
										target="_blank"
									>
										{title}
									</Link>
								</h1>

								{/* Price */}
								<div className="my-2 text-sm font-semibold text-slate-600">
									{price ? (
										<Badge variant="secondary" className="bg-rose-100 text-rose-600 px-2 py-1 rounded-md">
											{price === "Gratis" ? "Free" : `${price} IDR`}
										</Badge>
									) : (
										<span className="opacity-0">-</span>
									)}
								</div>

								{/* Rating */}
								<div className="flex items-center gap-2 mt-1">
									<span className="text-slate-600 text-sm font-semibold">{rating}</span>
									<div className="flex items-center gap-0.5">{renderCircles(rating)}</div>
									<span className="text-slate-500 text-xs font-medium">{reviewers}</span>
								</div>

								{/* Location */}
								<div className="flex items-center gap-1.5 text-slate-500 text-sm hover:text-rose-500 transition-colors duration-200 group mt-1">
									<MapPin size={14} className="group-hover:scale-110 transition-transform duration-200" />
									<span className="underline decoration-1 underline-offset-4 cursor-pointer decoration-slate-200 group-hover:decoration-rose-200">{location}</span>
								</div>
							</div>

							{/* Description */}
							<div className="mt-6">
								<p
									className="text-slate-600 text-base leading-relaxed overflow-hidden"
									style={{
										display: "-webkit-box",
										WebkitLineClamp: 3,
										WebkitBoxOrient: "vertical",
									}}
								>
									{description}
								</p>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default TravelCard;
