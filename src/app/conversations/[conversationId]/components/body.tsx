'use client';

import { useConversation } from '@/hooks/use-conversation';
import { pusherClient } from '@/libs/pusher';
import { FullMessageType } from '@/types';
import axios from 'axios';
import { find } from 'lodash';
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

	React.useEffect(() => {
		pusherClient.subscribe(conversationId);
		bottomRef?.current?.scrollIntoView();

		const messageHandler = (message: FullMessageType) => {
			axios.post(`/api/conversations/${conversationId}/seen`);
			setMessages((current) => {
				if (find(current, { id: message.id })) {
					return current;
				} else {
					return [...current, message];
				}
			});
			bottomRef?.current?.scrollIntoView();
		};

		const updateMessageHandler = (newMessage: FullMessageType) => {
			setMessages((current) =>
				current.map((currentMessage) => {
					if (currentMessage.id === newMessage.id) {
						return newMessage;
					}

					return currentMessage;
				}),
			);
		};

		pusherClient.bind('messages:new', messageHandler);
		pusherClient.bind('message:update', updateMessageHandler);

		return () => {
			pusherClient.unsubscribe(conversationId);
			pusherClient.unbind('messages:new', messageHandler);
			pusherClient.unbind('message:update', updateMessageHandler);
		};
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
