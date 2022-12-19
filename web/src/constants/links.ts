import {IconLayout2, IconCalendarEvent, IconUsers, IconUserPlus, IconCalendarPlus } from '@tabler/icons';
export const links = [
	{
		Icon: IconLayout2,
		label: 'Dashboard',
		path: '',
	},
	{
		Icon: IconUsers,
		label: 'Members',
		path: 'members',
	},
	{
		Icon: IconUserPlus,
		label: 'Add Member',
		path: 'add-member',
	},
	{
		Icon: IconCalendarEvent,
		label: 'Events',
		path: 'events',
	},
	{
		Icon: IconCalendarPlus,
		label: 'Add Event',
		path: 'add-event',
	}
] as const
