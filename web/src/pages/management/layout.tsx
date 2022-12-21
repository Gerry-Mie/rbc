import {AppShell} from '@mantine/core';
import Navbar from '../../components/management/layout/navbar';
import {Outlet, useNavigate} from 'react-router-dom';
import Header from '../../components/management/layout/header';
import {useMediaQuery} from '@mantine/hooks';
import {useAppSelector} from '../../hooks';

const ManagementLayout = () => {

	const matches = useMediaQuery('(max-width: 992px)')
	const navigate = useNavigate()
	const userState = useAppSelector(state => state.user.state)

	if (userState==='empty') navigate('/login', {replace: true})

	return (
		<AppShell
			padding="md"
			navbar={<Navbar/>}
			header={<Header/>}
			styles={(theme) => ({
				main: {
					backgroundColor: theme.colors.scheme[1],
					paddingLeft: matches? 16: 330
				},
			})}
		>
			<Outlet/>
		</AppShell>
	)
}

export default ManagementLayout;
