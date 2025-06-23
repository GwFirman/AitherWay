import { prisma } from "@/lib/prisma";

export const USER_LOGIN_LIMIT = 20;

export async function incrementUserApiLimit(userId: string): Promise<void> {
	if (!userId) return;
	const userApiLimit = await prisma.userApiLimit.findUnique({ where: { userId } });
	if (userApiLimit) {
		await prisma.userApiLimit.update({ where: { userId }, data: { count: userApiLimit.count + 1 } });
	} else {
		await prisma.userApiLimit.create({ data: { userId, count: 1 } });
	}
}

export async function checkUserApiLimit(userId: string): Promise<boolean> {
	if (!userId) return false;
	const userApiLimit = await prisma.userApiLimit.findUnique({ where: { userId } });
	if (!userApiLimit || userApiLimit.count < USER_LOGIN_LIMIT) return true;
	const today = new Date();
	const updatedAt = userApiLimit.updatedAt;
	if (updatedAt.getDate() !== today.getDate() || updatedAt.getMonth() !== today.getMonth() || updatedAt.getFullYear() !== today.getFullYear()) {
		// Reset hitungan jika sudah ganti hari
		await prisma.userApiLimit.update({ where: { userId }, data: { count: 1 } });
		return true;
	}
	return false;
}
