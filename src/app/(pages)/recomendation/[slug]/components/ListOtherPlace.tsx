"use server";

import { prisma } from "@/lib/prisma";
import OtherPlaceTravel from "./OtherPlaceTravel";

export default async function ListOtherPlace({ currentId }: { currentId: string }) {
	const placesRaw: any[] = await prisma.$queryRaw`
        SELECT * FROM "Maps" WHERE id <> ${currentId} ORDER BY RANDOM() LIMIT 5
    `;

	const placeIds = placesRaw.map((p) => p.id);
	const allReviews = await prisma.reviews.findMany({
		where: { mapsId: { in: placeIds } },
		select: { mapsId: true, rating: true },
	});

	const places = placesRaw.map((place) => {
		const reviews = allReviews.filter((r) => r.mapsId === place.id);
		const total_ulasan = reviews.length;
		const rating = total_ulasan > 0 ? (reviews.reduce((sum, r) => sum + parseFloat(r.rating || "0"), 0) / total_ulasan).toFixed(1) : "0.0";
		return {
			id: place.id,
			nama: place.nama,
			alamat: place.alamat,
			distance_km: 0, 
			deskripsi: place.deskripsi,
			harga: place.harga,
			rating,
			total_ulasan,
			gambar: place.gambar,
			slug: place.slug,
		};
	});
	return <OtherPlaceTravel places={places} />;
}
