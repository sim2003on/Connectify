import getCurrentUser from '@/app/actions/get-current-user';
import prisma from '@/libs/prisma-db';
import { NextResponse } from 'next/server';

interface IParams {
	conversationId?: string;
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams },
) {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const { conversationId } = params;

		const existingConversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				users: true,
			},
		});

		if (!existingConversation) {
			return new NextResponse('Invalid ID', { status: 400 });
		}

		const delatedConversation = await prisma.conversation.delete({
			where: {
				id: conversationId,
				userIds: {
					hasSome: [currentUser.id],
				},
			},
		});

		return NextResponse.json({
			delatedConversation,
			message: 'Conversation Deleted',
		});
	} catch (error: any) {
		console.error(error, 'CONVERSATION_DELETE_ERROR');

		return new NextResponse('Internal Error', { status: 500 });
	}
}
