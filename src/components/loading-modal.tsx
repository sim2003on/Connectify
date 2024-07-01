'use client';

import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from '@headlessui/react';
import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingModal: React.FC = () => {
	return (
		<Transition show as={React.Fragment}>
			<Dialog className='relative z-50' as='div' onClose={() => {}}>
				<TransitionChild
					as={React.Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-gray-100 transition-opacity bg-opacity-50' />
				</TransitionChild>

				<div className='fixed inset-0 z-10 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<DialogPanel>
							<ClipLoader size={80} color='#0284c7' />
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default LoadingModal;
