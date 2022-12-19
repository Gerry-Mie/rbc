import {createStyles, Divider, Navbar as Nav} from '@mantine/core';
import {useAppSelector} from '../../../hooks';
import {links} from '../../../constants/links';
import {LinkObj} from '../../../types/links';
import NavLink from './nav-link';
import UserButton from './UserButton';
import {useMediaQuery} from '@mantine/hooks';

const useStyle = createStyles((theme, matches: boolean) => ({
	root: {
		height: 'auto',
		padding: theme.spacing.xs,
		paddingTop: 40,
		margin: matches ? 0 : theme.spacing.xs,
		borderRadius: theme.radius.sm,
		border: 'none',
		backgroundColor: theme.colors.scheme[0],
	},
}))
const Navbar = () => {

	const opened = useAppSelector(state => state.nav.open)
	const selected = useAppSelector(s => s.nav.selected)
	const matches = useMediaQuery('(max-width: 992px)')
	const {classes} = useStyle(matches)

	return (
		<Nav className={classes.root} width={{base: matches ? '100%' : 300}} hiddenBreakpoint="md" hidden={!opened}>
			<UserButton
				image="https://lh3.googleusercontent.com/a/AEdFTp4v6gok89pTGHDLn7cNgkeohdlxwuP1CSnJ2mWC=s96-c-rg-br100"
				name="Gerry Mie"
				role="Admin"
			/>

			<Divider my="sm"/>

			{/* nav links */}
			{links.map((props: LinkObj) => (
				<NavLink key={props.label} {...props} selected={props.label === selected}/>
			))}
		</Nav>
	)
}

export default Navbar;
