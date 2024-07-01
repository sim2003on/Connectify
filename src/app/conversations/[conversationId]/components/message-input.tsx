'use client';

import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface IMessageInputProps {
	placeholder?: string;
	id: string;
	type?: string;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const MessageInput: React.FC<IMessageInputProps> = ({
	placeholder,
	id,
	type,
	required,
	register,
	errors,
}) => {
	return (
		<div className='relative w-full'>
			<input
				type={type}
				placeholder={placeholder}
				id={id}
				autoComplete={id}
				{...register(id, { required })}
				className='text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none'
			/>
		</div>
	);
};

export default MessageInput;
