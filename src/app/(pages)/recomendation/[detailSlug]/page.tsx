"use server";

import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Star, MapPin, Ticket, Users, PinIcon, Clock, Phone, Globe } from "lucide-react";
import ReviewSection from "@/app/recomendation/[slug]/component/review";
import PlaceDetails from "./component/placeDetail";
import HeroSection from "./component/heroSection";
import OtherPlaces from "./component/otherPlace";


export default async function RecomendationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = (await params) as { slug: string };
	const data = await prisma.maps.findFirst({ where: { slug: slug } });

	if (!data) {
		return (
			<div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-4 px-4">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900">Data Tidak Ditemukan</h1>
					<p className="text-gray-600 mt-2">Tempat wisata yang Anda cari tidak tersedia.</p>
				</div>
			</div>
		);
	}

	const reviews = await prisma.reviews.findMany({
		where: { mapsId: data?.id },
		orderBy: { createdAt: 'desc' },
	});

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}

			<HeroSection data={data} />
			{/* Content Section */}
			<PlaceDetails data={data} />;

			{/* Reviews Section */}
			<ReviewSection reviews={reviews} />
			{/* Other Places Section */}
			<OtherPlaces />
		</div>
	);
}