import UserInterface from '../../../types/user-interface';
import React, {FC, useState} from 'react';
import {Button, Divider, Grid, Modal, PasswordInput, Text, TextInput} from '@mantine/core';
import {useAppSelector} from '../../../hooks';
import {createUserFunction} from '../../../firebase/functions';
import {showNotification} from '@mantine/notifications';

interface Prop {
    user: UserInterface
}

const CreateAccount: FC<Prop> = ({user}) => {

    const permissions = useAppSelector(state => state.user.permissions)
    const [modalState, setModalState] = useState<boolean>(false)
    const [email, setEmail] = useState<string>(user.email || '')
    const [password, setPassword] = useState<string>('rbc123')
    const [loading, setLoading] = useState(false)
    const createAccount = async () => {

        setLoading(true)

        try {
            await createUserFunction({
                email: user.email,
                docId: user.docId
            })

            showNotification({
                title: 'success',
                message: 'Account created',
                color: 'green'
            })


        } catch (error) {
            showNotification({
                title: 'Error',
                message: 'something went wrong',
                color: 'red'
            })
        }
        setLoading(false)
    }

    if (user.uid) {
        return (
            <Grid.Col sm={6}>
                <Text color="dimmed">Account Status </Text>
                <Text>Created</Text>
                <Divider/>
            </Grid.Col>
        )
    }

    if (!permissions?.addUser && !permissions?.admin) {
        return (
            <Grid.Col sm={6}>
                <Text color="dimmed">Account Status </Text>
                <Text>No Account</Text>
                <Divider/>
            </Grid.Col>
        )
    }

    return (
        <Grid.Col>
            <Modal
                opened={modalState}
                onClose={() => setModalState(false)}
                centered
                title={'Create account for ' + user.firstname}
            >
                <TextInput
                    value={email}
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}/>
                <PasswordInput
                    mt={20}
                    value={password}
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}/>
                <Button loading={loading} fullWidth mt={30} onClick={createAccount}>Submit</Button>
            </Modal>
            <Button onClick={() => setModalState(true)}>Add Account</Button>
        </Grid.Col>
    )
}

export default CreateAccount;
