'use client';

import { useConversation } from '@/hooks/use-conversation';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './message-input';

const Form: React.FC = () => {
	const { conversationId } = useConversation();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			message: '',
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setValue('message', '', { shouldValidate: true });

		axios.post('/api/messages', {
			conversationId,
			...data,
		});
	};

	const handleUpload = (result: any) => {
		axios.post('/api/messages', {
			conversationId,
			image: result?.info?.secure_url,
		});
	};

	return (
		<div className='py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
			<CldUploadButton
				options={{ maxFiles: 1 }}
				onSuccess={handleUpload}
				uploadPreset='yrydudvs'
			>
				<HiPhoto size={30} className='text-sky-500' />
			</CldUploadButton>

			<form
				className='flex items-center gap-2 lg:gap-4 w-full'
				onSubmit={handleSubmit(onSubmit)}
			>
				<MessageInput
					id='message'
					errors={errors}
					register={register}
					required
					placeholder='Write a message'
				/>
				<button
					type='submit'
					className='rounded-full p-2 bg-sky-500 hover:bg-sky-600 cursor-pointer transition'
				>
					<HiPaperAirplane
						size={18}
						className='text-white'
						onClick={() => {}}
					/>
				</button>
			</form>
		</div>
	);
};

export default Form;
