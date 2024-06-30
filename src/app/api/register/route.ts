import prisma from '@/libs/prisma-db';
import { hash } from 'argon2';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, name, password } = body;

		const isExist = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (isExist) {
			return new NextResponse('User already exists', { status: 409 });
		}

		if (!email || !name || !password) {
			return new NextResponse('Missing fields', { status: 400 });
		}
		const hashedPassword = await hash(password);
		const user = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
			},
		});

		return NextResponse.json(user);
	} catch (error: any) {
		console.error(error, 'REGISTER_ERROR');
		return new NextResponse('Internal Error', { status: 500 });
	}
}
