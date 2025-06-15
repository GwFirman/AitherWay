"use server";

import { prisma } from "@/lib/prisma";
import NavBar from "../NavBar";
import ReviewSection from "@/app/(pages)/recomendation/[slug]/components/ReviewTravel";
import HeroSection from "./components/HeroDetailTravel";
import DetailPlace from "./components/DetailPlaceTravel";
import OtherPlacesTravel from "./components/OtherPlaceTravel";
import ListOtherPlace from "./components/ListOtherPlace";

export default async function RecomendationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = (await params) as { slug: string };
	const data = await prisma.maps.findFirst({ where: { slug: slug } });

	if (!data) {
		return (
			<div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-4 px-4">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900">Data Tidak Ditemukan</h1>
					<p className="mt-2 text-gray-600">Tempat wisata yang Anda cari tidak tersedia.</p>
				</div>
			</div>
		);
	}

	const reviews = await prisma.reviews.findMany({
		where: { mapsId: data?.id },
		orderBy: { createdAt: "desc" },
	});

	return (
		<div className="min-h-screen bg-gray-50">
			<NavBar />
			<div className="py-20">
				<HeroSection data={data} />
				<DetailPlace data={data} />;
				<ReviewSection reviews={reviews} />
				<ListOtherPlace currentId={data.id} />
			</div>
		</div>
	);
}
