import { MapPin } from "lucide-react";
import Image from "next/image";
import { FaCircle, FaRegCircle, FaAdjust } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchResults {
	headers: string[];
	data: (string | number)[][];
}

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

const TravelCard = ({ searchResults, loading = false }: { searchResults: SearchResults; loading?: boolean }) => {
	if (loading) {
		return (
			<div className="flex flex-col gap-6 px-4 py-6">
				{Array.from({ length: 3 }).map((_, i) => (
					<div key={i} className="max-w-4xl w-full mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-sm flex flex-col xl:flex-row overflow-hidden">
						<div className="w-full xl:w-[320px] flex-shrink-0 relative h-48 xl:h-auto overflow-hidden">
							<Skeleton className="absolute inset-0 w-full h-full" />
							<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
						</div>

						<div className="flex-1 p-6 xl:p-8 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50/50">
							<div>
								<div className="flex flex-col gap-2">
									<Skeleton className="w-12 h-4" />
									<Skeleton className="w-3/4 h-8" />
									<Skeleton className="w-32 h-4 mt-2" />
									<Skeleton className="w-1/2 h-4 mt-2" />
								</div>
								<div className="mt-6 space-y-2">
									<Skeleton className="w-full h-4" />
									<Skeleton className="w-5/6 h-4" />
									<Skeleton className="w-2/3 h-4" />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}

	// kode asli tidak diubah
	return (
		<div className="flex flex-col gap-6 px-4 py-6">
			{searchResults.data.map((item, index) => {
				const id = index + 1;
				const [uuid, title, location, distance, description, price, ratingRaw, total_ulasan, image] = item;
				const rating = Number((ratingRaw as string).replaceAll(",", "."));

				return (
					<div key={uuid as string} className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-sm flex flex-col xl:flex-row overflow-hidden">
						<div className="w-full xl:w-[320px] flex-shrink-0 relative h-48 xl:h-auto overflow-hidden group">
							<Image width={300} height={0} src={image as string} alt={title as string} className="absolute inset-0 object-cover w-full h-full" />
							<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
						</div>

						<div className="flex-1 p-6 xl:p-8 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50/50">
							<div>
								<div className="flex flex-col">
									<div className="text-rose-400/80 text-md font-medium tracking-wider">{id.toString().padStart(2, "0")}</div>
									<h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
										<a href="">{title}</a>
									</h1>

									<div className="flex items-center gap-2 mt-1">
										<div className="flex items-center gap-0.5">{renderCircles(rating)}</div>
										<span className="text-slate-600 text-sm">({rating})</span>
									</div>

									<div className="flex items-center gap-1.5 text-slate-500 text-sm hover:text-rose-500 transition-colors duration-200 group mt-1">
										<MapPin size={14} className="group-hover:scale-110 transition-transform duration-200" />
										<span className="underline decoration-1 underline-offset-4 decoration-slate-200 group-hover:decoration-rose-200">
											<a href="">{location}</a>
										</span>
									</div>
								</div>

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
				);
			})}
		</div>
	);
};

export default TravelCard;
