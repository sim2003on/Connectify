'use client';

import { Toaster } from 'react-hot-toast';

export const ToasterContext = () => {
	return (
		<Toaster
			position='top-center'
			toastOptions={{
				duration: 3000,
			}}
		/>
	);
};
