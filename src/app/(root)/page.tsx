import Image from 'next/image';
import { AuthForm } from './components/auth-form';

export default function Home() {
	return (
		<div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px8 bg-gray-800'>
			<div className='flex flex-col items-center'>
				<Image src='/assets/images/logo.png' alt='Logo' width={250} height={250} />
				<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-100'>
					Sign in to your account
				</h2>
			</div>
			<AuthForm />
		</div>
	);
}
