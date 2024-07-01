'use client';

import { Button } from '@/components/button';
import { Input } from '@/components/inputs/input';
import Select from '@/components/inputs/select';
import Modal from '@/components/modal';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface IGroupChatModalProps {
	isOpen?: boolean;
	onClose: () => void;
	users: User[];
}

const GroupChatModal: React.FC<IGroupChatModalProps> = ({
	isOpen,
	onClose,
	users,
}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			members: [],
		},
	});

	const members = watch('members');

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post('/api/conversations', {
				...data,
				isGroup: true,
			})
			.then(() => {
				toast.success('Group chat created');
				router.refresh();
				onClose();
			})
			.catch(() => {
				toast.error('Something went wrong');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='space-y-12'>
					<div className='border-b border-gray-900/10 pb-12'>
						<h2 className='text-base font-semibold leading-7 text-gray-900'>
							Create a group chat
						</h2>
						<p className='mt-1 text-sm leading-6 text-gray-600'>
							Create a chat with more than 2 people.
						</p>
						<div className='mt-10 flex flex-col gap-y-8'>
							<Input
								label='Name'
								id='name'
								register={register}
								errors={errors}
								required
							/>
							<Select
								label='Members'
								disabled={isLoading}
								users={users}
								options={users.map((user) => ({
									label: user.name,
									value: user.id,
								}))}
								onChange={(value) => {
									setValue('members', value, {
										shouldValidate: true,
									});
								}}
								value={members}
							/>
						</div>
					</div>
				</div>
				<div className='mt-6 flex items-center justify-end gap-x-6'>
					<Button
						type='button'
						disabled={isLoading}
						onClick={onClose}
						secondary
					>
						Cancel
					</Button>
					<Button type='submit' disabled={isLoading}>
						Create
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default GroupChatModal;
