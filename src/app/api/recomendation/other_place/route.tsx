import { prisma } from "@/lib/prisma";
import { Maps } from "@prisma/client";
import { raw } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export const GET = async () => {
	// Use $queryRaw to fetch random rows since Prisma does not support random() in orderBy
	const data = (await prisma.$queryRaw`
		SELECT * FROM "Maps"
		WHERE "gambar" LIKE 'https://%'
		ORDER BY RANDOM()
		LIMIT 6
	`) as Maps[];

	if (!data) {
		return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
	}

	return NextResponse.json(data, { status: 200 });
};
