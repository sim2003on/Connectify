import { FullConversationType } from '@/types';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

export const useOtherUser = (
	conversetion:
		| FullConversationType
		| {
				users: User[];
		  },
) => {
	const session = useSession();
	const otherUser = useMemo(() => {
		const currentUserEmail = session.data?.user?.email;
		const otherUser = conversetion.users.filter(
			(user) => user.email !== currentUserEmail,
		);
		return otherUser[0];
	}, [session.data?.user?.email, conversetion.users]);
	return otherUser;
};
