'use client';

import { Avatar } from '@/components/avatar';
import { useOtherUser } from '@/hooks/use-other-user';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';

interface IHeaderProps {
	conversation: Conversation & {
		users: User[];
	};
}

const Header: React.FC<IHeaderProps> = ({ conversation }) => {
	const otherUser = useOtherUser(conversation);

	const statusText = React.useMemo(() => {
		if (conversation.isGroup) {
			return `${conversation.users.length} members`;
		}
		return 'active';
	}, [conversation]);
	return (
		<div
			className='
		bg-white
		w-full
		flex
		border-b-[1px]
		sm:px-4
		py-3
		px-4
		lg:px-6
		justify-between
		items-center
		shadow-sm
	'
		>
			<div className='flex gap-3 items-center'>
				<Link
					className='lg:hidden block text-sky-500
				hover:text-sky-600 transition cursor-pointer'
					href='/conversations'
				>
					<HiChevronLeft size={32} />
				</Link>
				<Avatar user={otherUser} />
				<div className='flex flex-col'>
					<div>{conversation.name || otherUser.name}</div>
					<div className='text-sm font-light text-neutral-500'>
						{statusText}
					</div>
				</div>
			</div>
			<HiEllipsisHorizontal
				onClick={() => {}}
				className='text-sky-500 hover:text-sky-600 transition cursor-pointer'
				size={32}
			/>
		</div>
	);
};

export default Header;
