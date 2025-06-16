import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	if (!slug) {
		return NextResponse.json({ error: "Slug tidak ditemukan" }, { status: 400 });
	}

	const data = await prisma.maps.findFirst({ where: { slug } });

	if (!data) {
		return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
	}

	return NextResponse.json(data, { status: 200 });
};
