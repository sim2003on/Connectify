'use client';

import clsx from 'clsx';
import React from 'react';

interface ButtonProps {
	className?: string;
	type: 'button' | 'submit' | 'reset' | undefined;
	onClick?: () => void;
	fullWidth?: boolean;
	children?: React.ReactNode;
	secondary?: boolean;
	disabled?: boolean;
	danger?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	type,
	fullWidth,
	className,
	onClick,
	children,
	secondary,
	disabled,
	danger,
}) => {
	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disabled}
			className={clsx(
				'flex justify-center rounded-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-offset-2 px-3 py-2 text-sm',
				disabled && 'opacity-50 cursor-not-allowed',
				fullWidth && 'w-full',
				secondary ? 'text-gray-900' : 'text-white',
				danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
				!secondary && !danger && 'bg-sky-600 hover:bg-sky-700 focus-visible:outline-sky-700',
			)}
		>
			{children}
		</button>
	);
};
