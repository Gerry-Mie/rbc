import {FC} from 'react';
import {links} from '../constants/links';
export interface LinkObj {
	Icon: FC;
	label: string;
	path: string;
}

export type LinkId = typeof links[number]['label']
