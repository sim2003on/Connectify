'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { IconType } from 'react-icons';

interface IMobileItemProps {
	href?: string;

	label: string;

	icon: IconType;

	active?: boolean;

	onClick?: () => void;
}

export const MobileItem: React.FC<IMobileItemProps> = ({
	href,
	label,
	icon: Icon,
	active,
	onClick,
}) => {
	const handelClick = () => {
		if (onClick) {
			return onClick();
		}
	};

	return (
		<Link
			href={href || '#'}
			className={clsx(
				'group flex gap-x-3 text-sm leading-6 w-full font-semibold justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100',
				active && 'bg-gray-100 text-black',
			)}
			onClick={handelClick}
		>
			<Icon size={24} className='shrink-0' />
			<span className='sr-only'>{label}</span>
		</Link>
	);
};
