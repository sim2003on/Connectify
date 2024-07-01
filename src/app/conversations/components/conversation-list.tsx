'use client';

import { useConversation } from '@/hooks/use-conversation';
import { FullConversationType } from '@/types';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { pusherClient } from '@/libs/pusher';
import { User } from '@prisma/client';
import { find } from 'lodash';
import { useSession } from 'next-auth/react';
import React from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './conversation-box';
import GroupChatModal from './group-chat-modal';

interface IConversationListProps {
	initialItems: FullConversationType[];
	users: User[];
}

const ConversationList: React.FC<IConversationListProps> = ({
	initialItems,
	users,
}) => {
	const [items, setItems] = React.useState(initialItems);
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const router = useRouter();

	const session = useSession();

	const { conversationId, isOpen } = useConversation();

	const pusherKey = React.useMemo(() => {
		return session.data?.user?.email;
	}, [session.data?.user?.email]);

	React.useEffect(() => {
		if (!pusherKey) return;

		pusherClient.subscribe(pusherKey);

		const newHandler = (conversation: FullConversationType) => {
			setItems((current) => {
				if (find(current, { id: conversation.id })) return current;

				return [conversation, ...current];
			});
		};

		const updateHandler = (conversation: FullConversationType) => {
			setItems((current) =>
				current.map((currentConversation) => {
					if (currentConversation.id === conversation.id)
						return {
							...currentConversation,
							messages: conversation.messages,
						};

					return currentConversation;
				}),
			);
		};

		const removeHandler = (conversation: FullConversationType) => {
			setItems((current) => {
				return [
					...current.filter(
						(currentConversation) => currentConversation.id !== conversation.id,
					),
				];
			});

			if (conversationId === conversation.id) router.push('/conversations');
		};

		pusherClient.bind('conversation:new', newHandler);
		pusherClient.bind('conversation:update', updateHandler);
		pusherClient.bind('conversation:remove', removeHandler);

		return () => {
			pusherClient.unsubscribe(pusherKey);
			pusherClient.unbind('conversation:new', newHandler);
			pusherClient.unbind('conversation:update', newHandler);
			pusherClient.unbind('conversation:remove', removeHandler);
		};
	}, [pusherKey, conversationId, router]);

	return (
		<>
			<GroupChatModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				users={users}
			/>
			<aside
				className={clsx(
					'fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200',
					!isOpen ? 'hidden' : 'block w-full left-0',
				)}
			>
				<div className='px-5'>
					<div className='flex justify-between mb-4 pt-4 items-center'>
						<div className='text-2xl font-bold text-neutral-800'>Messages</div>
						<div className='rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition'>
							<MdOutlineGroupAdd
								onClick={() => setIsModalOpen(true)}
								size={24}
							/>
						</div>
					</div>
					{items.map((item) => (
						<ConversationBox
							key={item.id}
							data={item}
							selected={conversationId === item.id}
						/>
					))}
				</div>
			</aside>
		</>
	);
};

export default ConversationList;
