'use client';

import { User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface IAvatarProps {
	user?: User;
}

export const Avatar: React.FC<IAvatarProps> = ({ user }) => {
	return (
		<div className='relative'>
			<div className='relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11'>
				<Image
					alt='Avatar'
					src={user?.image || '/assets/images/placeholder.jpg'}
					fill
				/>
			</div>
			<span
				className='absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white md:h-3 md:w-3 
				'
			/>
		</div>
	);
};
