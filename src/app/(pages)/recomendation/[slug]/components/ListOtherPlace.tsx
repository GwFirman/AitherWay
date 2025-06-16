"use client";

import OtherPlaceTravel from "./OtherPlaceTravel";
import { useEffect, useState } from "react";
import { Maps } from "@prisma/client";
import axios from "axios";
import { useSearch } from "@/contexts/SearchContext";

export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const R = 6371; // Radius bumi dalam km
	const dLat = (lat2 - lat1) * (Math.PI / 180);
	const dLon = (lon2 - lon1) * (Math.PI / 180);

	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Hasil dalam kilometer
}

export default function ListOtherPlace() {
	const { coordinates } = useSearch();
	const [placesRaw, setPlacesRaw] = useState<Maps[]>([]);

	useEffect(() => {
		(async () => {
			const res = await axios.get<Maps[]>(`/api/recomendation/other_place`);
			setPlacesRaw(res.data);
		})();
	}, []);

	return <OtherPlaceTravel places={placesRaw} />;
}
