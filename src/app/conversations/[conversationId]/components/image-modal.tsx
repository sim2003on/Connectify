'use client';

import Modal from '@/components/modal';
import Image from 'next/image';
import React from 'react';

interface IImageModalProps {
	src?: string | null;
	onClose: () => void;
	isOpen?: boolean;
}

const ImageModal: React.FC<IImageModalProps> = ({
	src,
	onClose,
	isOpen = false,
}) => {
	if (!src) {
		return null;
	}
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className='w-80 h-80'>
				<Image alt='Image' src={src} fill className='object-cover' />
			</div>
		</Modal>
	);
};

export default ImageModal;
