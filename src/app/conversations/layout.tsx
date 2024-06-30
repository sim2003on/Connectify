import { SideBar } from '../../components/sidebar/side-bar';
import getConversations from '../actions/get-conversations';
import ConversationList from './components/conversation-list';

export default async function ConversationsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const conversations = await getConversations();
	return (
		<SideBar>
			<div className='h-full'>
				<ConversationList initialItems={conversations} />
				{children}
			</div>
		</SideBar>
	);
}
