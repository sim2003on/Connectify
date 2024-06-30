import { SideBar } from '../components/sidebar/side-bar';

interface IUsersLayoutProps {
	children: React.ReactNode;
}

export default async function UsersLayout({ children }: IUsersLayoutProps) {
	return (
		<SideBar>
			<div className='h-full'>{children}</div>
		</SideBar>
	);
}
