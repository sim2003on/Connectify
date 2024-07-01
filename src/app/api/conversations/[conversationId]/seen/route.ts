import getCurrentUser from '@/app/actions/get-current-user';
import prisma from '@/libs/prisma-db';
import { pusherServer } from '@/libs/pusher';
import { NextResponse } from 'next/server';

interface IParams {
	conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	try {
		const currentUser = await getCurrentUser();
		const { conversationId } = params;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		// find conversation
		const conversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				messages: {
					include: {
						seen: true,
					},
				},
				users: true,
			},
		});

		if (!conversation) {
			return new NextResponse('Invalid ID', { status: 400 });
		}

		// find last
		const lastMessage = conversation.messages[conversation.messages.length - 1];

		if (!lastMessage) {
			return NextResponse.json(conversation);
		}

		// update last seen
		const updatedMessage = await prisma.message.update({
			where: {
				id: lastMessage.id,
			},
			include: {
				seen: true,
				sender: true,
			},
			data: {
				seen: {
					connect: {
						id: currentUser.id,
					},
				},
			},
		});

		await pusherServer.trigger(currentUser.email, 'conversation:update', {
			id: conversationId,
			messages: [updatedMessage],
		});

		if (lastMessage.seenIds.indexOf(currentUser.id) !== -1)
			return NextResponse.json(conversation);

		await pusherServer.trigger(
			conversationId!,
			'message:update',
			updatedMessage,
		);

		return NextResponse.json(updatedMessage);
	} catch (error: any) {
		console.error(error, 'ERROR_MESSAGES_SEEN');

		return new NextResponse('Internal Error', { status: 500 });
	}
}
