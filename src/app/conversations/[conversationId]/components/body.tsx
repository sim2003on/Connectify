'use client';

import { useConversation } from '@/hooks/use-conversation';
import { FullMessageType } from '@/types';
import axios from 'axios';
import React from 'react';
import MessageBox from './message-box';

interface IBodyProps {
	initialMessages: FullMessageType[];
}

const Body: React.FC<IBodyProps> = ({ initialMessages }) => {
	const [messages, setMessages] = React.useState(initialMessages);
	const bottomRef = React.useRef<HTMLDivElement>(null);

	const { conversationId } = useConversation();

	React.useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`);
	}, [conversationId]);

	return (
		<div className='flex-1 overflow-y-auto'>
			{messages.map((message, i) => (
				<MessageBox
					isLast={i === messages.length - 1}
					key={message.id}
					data={message}
				/>
			))}
			<div ref={bottomRef} className='pt-24' />
		</div>
	);
};

export default Body;
