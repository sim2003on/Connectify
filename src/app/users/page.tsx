'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

const Users: React.FC = () => {
	return (
		<>
			<button onClick={() => signOut()}>log out</button>
		</>
	);
};

export default Users;
