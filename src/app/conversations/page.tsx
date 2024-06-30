'use client';

import clsx from 'clsx';
import EmptyState from '../../components/empty-state';
import { useConversation } from '../../hooks/use-conversation';

const Home = () => {
	const { isOpen } = useConversation();

	return (
		<div
			className={clsx('lg:pl-80 h-full lg:block', isOpen ? 'block' : 'hidden')}
		>
			<EmptyState />
		</div>
	);
};

export default Home;
