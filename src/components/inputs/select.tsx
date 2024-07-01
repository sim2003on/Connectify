'use client';

import { User } from '@prisma/client';
import React from 'react';

import ReactSelect from 'react-select';

interface ISelectProps {
	label: string;
	value?: Record<string, any>;
	onChange: (value: Record<string, any>) => void;
	options: Record<string, any>[];
	disabled?: boolean;
	users: User[];
}

const Select: React.FC<ISelectProps> = ({
	label,
	onChange,
	options,
	users,
	value,
	disabled,
}) => {
	return (
		<div className='z-[100]'>
			<label className='block text-sm font-medium leading-6 text-gray-900'>
				{label}
			</label>
			<div className='mt-2'>
				<ReactSelect
					isDisabled={disabled}
					value={value}
					options={options}
					onChange={onChange}
					menuPortalTarget={document.body}
					isMulti
					styles={{
						menuPortal: (base) => ({ ...base, zIndex: 9999 }),
					}}
					classNames={{
						control: () => 'text-sm',
					}}
				/>
			</div>
		</div>
	);
};

export default Select;
