import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import { AuthContext } from '../context/auth-context';
import { ToasterContext } from '../context/toaster-context';
import './globals.css';

const rubik = Rubik({
	subsets: ['latin'],
	weight: ['400', '600', '700', '800', '900'],
});

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
			<body className={rubik.className}>
				<AuthContext>
					<ToasterContext />
					{children}
				</AuthContext>
			</body>
		</html>
	);
}
