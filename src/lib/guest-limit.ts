import { prisma } from "@/lib/prisma";

const GUEST_LIMIT = 3;

export async function checkAndIncrementGuestLimit(ip: string): Promise<boolean> {
	if (!ip) return false;

	const today = new Date();
	const record = await prisma.guestApiLimit.findUnique({
		where: { ipAddress: ip },
	});

	if (!record) {
		await prisma.guestApiLimit.create({
			data: { ipAddress: ip, count: 1 },
		});
		return true;
	}

	const updatedAt = record.updatedAt;
	const isSameDay = updatedAt.getDate() === today.getDate() && updatedAt.getMonth() === today.getMonth() && updatedAt.getFullYear() === today.getFullYear();

	if (isSameDay) {
		if (record.count >= GUEST_LIMIT) {
			return false;
		}
		await prisma.guestApiLimit.update({
			where: { ipAddress: ip },
			data: { count: { increment: 1 } },
		});
		return true;
	} else {
		await prisma.guestApiLimit.update({
			where: { ipAddress: ip },
			data: { count: 1 },
		});
		return true;
	}
}
