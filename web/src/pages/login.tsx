import {Box, Button, Flex, Paper, PasswordInput, TextInput, Title} from '@mantine/core';
import {useForm} from '@mantine/form';
import {login, LoginInterface} from '../forms/login.form';
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase';
import {showNotification} from '@mantine/notifications';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const f = useForm(login)
    const navigate = useNavigate()

    useEffect(() => {

        return auth.onAuthStateChanged((user)=> {
            if (user){
                navigate('/management', {replace: true})
            }
        })

    }, [])

    const onSubmit = async (values: LoginInterface) => {
        setLoading(true)
        try {

            await signInWithEmailAndPassword(auth, values.email, values.password)

        } catch (error: any) {

            console.log(error.code)

            if (error?.code === 'auth/user-not-found') {
                showNotification({
                    title: '',
                    message: 'Invalid Email or Password',
                    color: 'yellow'
                })
            } else {
                showNotification({
                    title: 'Error',
                    message: error.code,
                    color: 'red'
                })
            }

        }
        setLoading(false)
    }

    return (
        <Flex
            h="100%"
            align="center"
            justify="center"
            sx={theme => ({backgroundColor: theme.colors.scheme[1]})}
            p={20}>

            <Paper p="md" w="100%" maw={500}>
                <Title>LOGIN</Title>
                <Box mt={30}>
                    <form onSubmit={f.onSubmit(onSubmit)}>
                        <TextInput
                            label="Email"
                            {...f.getInputProps('email')}/>

                        <PasswordInput
                            mt={20}
                            label="Password" {...f.getInputProps('password')}/>
                        <Button loading={loading} type="submit" fullWidth mt={30}>Login</Button>
                    </form>

                </Box>
            </Paper>
        </Flex>
    );
}

export default Login;
