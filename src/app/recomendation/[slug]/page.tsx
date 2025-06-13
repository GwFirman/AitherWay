"use server";

import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function RecomendationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = (await params) as { slug: string };
	const data = await prisma.maps.findFirst({ where: { slug: slug } });

	if (!data) {
		return <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-4 py-28">Data not found</div>;
	}

	return (
		<div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-4 py-8 pt-28">
			<div className="w-full max-w-md break-words">{JSON.stringify(data, null, 4)}</div>
			<Image src={data?.gambar || ""} alt={data?.slug ?? ""} width={320} height={0} className="aspect-[4/3] w-full max-w-[320px] object-cover" />
		</div>
	);
}
