import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthContext } from './context/auth-context';
import { ToasterContext } from './context/toaster-context';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Connectify',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AuthContext>
					<ToasterContext />
					{children}
				</AuthContext>
			</body>
		</html>
	);
}
