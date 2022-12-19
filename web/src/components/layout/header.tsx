import {Button, Group, Header as MHeader, Title} from '@mantine/core'
import ToggleTheme from '../app/toggle-theme';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks';

const Header = () => {
    const userState = useAppSelector(state => state.user.state)
    return (
        <MHeader
            height={60}
            sx={theme => ({
                alignItems: 'center',
                display: 'flex',
                position: 'fixed',
                backdropFilter: 'blur(10px)',
                backgroundColor: theme.colorScheme === 'dark' ? 'rgba(37,43,51,0.81)' : 'rgba(255,255,255,0.71)',
            })}
            p="sm"
        >
            <Group position="apart" sx={{width: '100%'}}>
                <Title>RBC</Title>

                <Group spacing="sm">

                    <ToggleTheme/>

                    {userState === 'logged-in'
                        ? (<Link to="management"><Button>Management</Button></Link>)
                        : (<Link to="login"><Button>login</Button></Link>)
                    }
                </Group>
            </Group>
        </MHeader>
    );
};

export default Header;
