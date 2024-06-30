import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';

interface IDesktopItemProps {
	href?: string;
	label: string;
	icon: IconType;
	active?: boolean;
	onClick?: () => void;
}

export const DesktopItem: React.FC<IDesktopItemProps> = ({
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
		<li onClick={handelClick}>
			<Link
				href={href || '#'}
				className={clsx(
					'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100',
					active && 'bg-gray-100 text-black',
				)}
			>
				<Icon size={24} className='shrink-0' />
				<span className='sr-only'>{label}</span>
			</Link>
		</li>
	);
};
