import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	const reviews = await prisma.maps.findFirst({
		where: {
			slug,
		},
		include: {
			reviews: true,
		},
	});

	if (!reviews?.reviews) {
		return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
	}

	return NextResponse.json(reviews.reviews, { status: 200 });
};
