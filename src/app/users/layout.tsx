import { SideBar } from '../../components/sidebar/side-bar';
import getUsers from '../actions/get-users';
import { UserList } from './components/user-list';

interface IUsersLayoutProps {
	children: React.ReactNode;
}

export default async function UsersLayout({ children }: IUsersLayoutProps) {
	const users = await getUsers();
	return (
		<SideBar>
			<div className='h-full'>
				<UserList items={users} />
				{children}
			</div>
		</SideBar>
	);
}
