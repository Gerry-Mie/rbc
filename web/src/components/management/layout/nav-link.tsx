import React, {FC} from 'react';

import {UnstyledButton, Group, Text} from '@mantine/core';
import {Link} from 'react-router-dom';

interface Props {
	Icon: FC;
	selected: boolean
	label: string;
	path: string
}

function NavLink({Icon, selected, label, path}: Props) {
	return (
		<Link to={path} style={{textDecoration: 'none'}}>
			<UnstyledButton
				sx={(theme) => ({
					display: 'block',
					width: '100%',
					padding: theme.spacing.xs,
					borderRadius: theme.radius.sm,
					color: selected
						? theme.colors.blue[7]
						: theme.colors.scheme[2],///theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.black,
					// backgroundColor: selected? theme.colors.blue[7]:'',
					'&:hover': {
						color: theme.colors.blue[7]
					},
				})}
			>
				<Group>
					<Icon/>
					<Text size="sm">{label}</Text>
				</Group>
			</UnstyledButton>
		</Link>

	);
}

export default NavLink;
