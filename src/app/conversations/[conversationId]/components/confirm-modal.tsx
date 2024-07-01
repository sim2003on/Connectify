'use client';

import { Button } from '@/components/button';
import Modal from '@/components/modal';

import { useConversation } from '@/hooks/use-conversation';
import { DialogTitle } from '@headlessui/react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

import { FiAlertTriangle } from 'react-icons/fi';

interface IConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ConfirmModal: React.FC<IConfirmModalProps> = ({ isOpen, onClose }) => {
	const router = useRouter();
	const { conversationId } = useConversation();
	const [isLoading, setIsLoading] = React.useState(false);

	const onDelete = React.useCallback(() => {
		setIsLoading(true);

		axios
			.delete(`/api/conversations/${conversationId}`)
			.then((data) => {
				toast.success(
					data.data.delatedConversation.isGroup
						? 'Group deleted'
						: 'Conversation deleted',
				);
				router.push('/conversations');
				router.refresh();
			})
			.catch(() => {
				toast.error('Something went wrong.');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [router, conversationId, onClose]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className='sm:flex sm:item-start'>
				<div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
					<FiAlertTriangle size={24} className='text-red-600' />
				</div>
				<div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
					<DialogTitle
						as='h3'
						className={'text-base font-semibold leading-6 text-gray-900'}
					>
						Delete Conversation
					</DialogTitle>
					<div className='mt-2'>
						<p className='text-sm text-gray-500'>
							Are you sure you want to delete this conversation?
						</p>
					</div>
				</div>
			</div>
			<div className='mt-5 gap-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
				<Button disabled={isLoading} danger onClick={onDelete}>
					Delete
				</Button>
				<Button disabled={isLoading} secondary onClick={onClose}>
					Cancel
				</Button>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
