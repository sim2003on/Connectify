import { getConversationById } from '@/app/actions/get-conversation-by-id';
import { getMessages } from '@/app/actions/get-messages';
import EmptyState from '@/components/empty-state';
import React from 'react';
import Body from './components/body';
import Form from './components/form';
import Header from './components/header';

interface IParams {
	params: {
		conversationId: string;
	};
}

const conversationId: React.FC<IParams> = async ({ params }) => {
	const conversation = await getConversationById(params.conversationId);
	const messages = await getMessages(params.conversationId);

	if (!conversation) {
		return (
			<div className='lg:pl-80 h-full'>
				<div className='h-full flex flex-col'>
					<EmptyState />
				</div>
			</div>
		);
	}

	return (
		<div className='lg:pl-80 h-full'>
			<div className='h-full flex flex-col'>
				<Header conversation={conversation} />
				<Body initialMessages={messages} />
				<Form />
			</div>
		</div>
	);
};

export default conversationId;
