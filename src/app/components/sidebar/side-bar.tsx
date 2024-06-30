import getCurrentUser from '@/app/actions/get-current-user';
import { DesktopSideBar } from './desktop-side-bar';
import { MobileFooter } from './mobile-footer';

interface ISideBarProps {
	children: React.ReactNode;
}

export async function SideBar({ children }: ISideBarProps) {
	const currentUser = await getCurrentUser();
	return (
		<div className='h-full'>
			<DesktopSideBar currentUser={currentUser!} />
			<MobileFooter />
			<main className='lg:pl-20 h-full'>{children}</main>
		</div>
	);
}
