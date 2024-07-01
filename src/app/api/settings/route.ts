import getCurrentUser from '@/app/actions/get-current-user';
import prisma from '@/libs/prisma-db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();
		const body = await request.json();
		const { name, image } = body;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: currentUser.id,
			},
			data: {
				name,
				image,
			},
		});

		return NextResponse.json(updatedUser);
	} catch (error: any) {
		console.error(error, 'SETTINGS_ERROR');

		return new NextResponse('Something went wrong', { status: 500 });
	}
}
