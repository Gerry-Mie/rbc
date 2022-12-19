import React from 'react';
import {Button, Group, Title, Header as MHeader, createStyles, Burger} from '@mantine/core';
import ToggleTheme from '../../app/toggle-theme';
import {Link, useNavigate} from 'react-router-dom';
import {useMediaQuery} from '@mantine/hooks';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {toggle_nav} from '../../../store/slice/navbar.slice';
import {auth} from '../../../firebase';

const useStyle = createStyles((theme) => ({
    root: {
        padding: theme.spacing.xs,
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        backgroundColor: theme.colorScheme === 'dark' ? 'rgba(37,43,51,0.81)' : 'rgba(255,255,255,0.71)',
        backdropFilter: 'blur(10px)',
    }
}))

const Header = () => {

    const {classes} = useStyle()
    const matches = useMediaQuery('(max-width: 992px)')
    const opened = useAppSelector(state => state.nav.open)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const toggleNav = () => dispatch(toggle_nav(!opened))
    const logout = () => auth.signOut().then(() => navigate('/'))

    return (
        <MHeader className={classes.root} height={60}>
            <Group position="apart" sx={{width: '100%'}}>
                <Group>
                    {
                        matches && <Burger opened={opened} onClick={toggleNav}/>
                    }
                    <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
                        <Title>RBC</Title>
                    </Link>
                </Group>

                <Group spacing="sm">
                    <ToggleTheme/>
                    <Link to="/">
                        <Button onClick={logout}>logout</Button>
                    </Link>
                </Group>
            </Group>
        </MHeader>
    );
};

export default Header;
