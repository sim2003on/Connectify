import { SideBar } from '../../components/sidebar/side-bar';
import getConversations from '../actions/get-conversations';
import getUsers from '../actions/get-users';
import ConversationList from './components/conversation-list';

export default async function ConversationsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const conversations = await getConversations();
	const users = await getUsers();
	return (
		<SideBar>
			<div className='h-full'>
				<ConversationList initialItems={conversations} users={users} />
				{children}
			</div>
		</SideBar>
	);
}
