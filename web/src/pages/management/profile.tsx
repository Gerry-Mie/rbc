import {useDocumentTitle} from '@mantine/hooks';
import {Avatar, Center, createStyles, Divider, Grid, Paper, TextInput, Title} from '@mantine/core';
import {useAppSelector} from '../../hooks';
import {DatePicker} from '@mantine/dates';

const useStyle = createStyles(theme => ({
    input: {
        'input': {
            '&:disabled': {
                backgroundColor: 'transparent',
                color: theme.colors.scheme[2],
                border: 'none',
                borderRadius: 0,
                cursor: 'default'
            }
        }
    }
}))

const Profile = () => {

    useDocumentTitle('Profile | RBC')
    const {classes} = useStyle()
    const data = useAppSelector(state => state.user.data)

    return (
        <>
            <Title order={2}>Profile</Title>
            <Paper p="lg" mt={30} maw={1200}>
                <Center>
                    <Avatar src={data?.photoUrl} size="xl"/>
                </Center>

                <Grid mt={20}>
                    <Grid.Col sm={6}>
                        <TextInput
                            label="Firstname"
                            defaultValue={data?.firstname}
                            className={classes.input}
                            disabled/>
                        <Divider/>
                    </Grid.Col>
                    <Grid.Col sm={6}>
                        <TextInput
                            label="Lastname"
                            defaultValue={data?.lastname}
                            className={classes.input}
                            disabled/>
                        <Divider/>
                    </Grid.Col>
                    <Grid.Col sm={6}>
                        <TextInput
                            label="Email"
                            defaultValue={data?.email}
                            className={classes.input}
                            disabled/>
                        <Divider/>
                    </Grid.Col>
                    <Grid.Col sm={6}>
                        <TextInput
                            label="Phone Number"
                            defaultValue={data?.phoneNumber}
                            className={classes.input}
                            disabled/>
                        <Divider/>
                    </Grid.Col>
                    <Grid.Col sm={6}>
                        <DatePicker
                            label="Date of Birth"
                            defaultValue={new Date(data?.dob || '')}
                            className={classes.input}
                            disabled/>
                        <Divider/>
                    </Grid.Col>
                    <Grid.Col sm={6}>
                        <TextInput
                            label="Gender"
                            defaultValue={data?.gender}
                            className={classes.input}
                            disabled/>
                        <Divider/>
                    </Grid.Col>
                </Grid>
            </Paper>

        </>
    );
}

export default Profile;
