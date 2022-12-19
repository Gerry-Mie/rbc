import {
    UnstyledButton,
    UnstyledButtonProps,
    Group,
    Avatar,
    Text,
    createStyles, Title,
} from '@mantine/core';
import React from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../../hooks';

const useStyles = createStyles((theme) => ({
    user: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
    },
}));

interface UserButtonProps extends UnstyledButtonProps {
    image: string;
    name: string;
    role: string;
}

const UserButton = ({image, name, role, ...others}: UserButtonProps) => {

    const {classes} = useStyles();
    const userData =  useAppSelector(state => state.user.data)

    return (
        <Link to="profile" style={{textDecoration: 'none'}}>
            <UnstyledButton className={classes.user} {...others}>
                <Group>
                    <Avatar src={userData?.photoUrl} radius="xl"/>

                    <div style={{flex: 1}}>
                        <Title order={4} size="sm" >
                            {userData?.firstname}
                        </Title>

                        <Text color="dimmed" size="xs">
                            {userData?.type}
                        </Text>
                    </div>
                </Group>
            </UnstyledButton>
        </Link>
    );
}


export default UserButton
