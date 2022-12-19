import {UseFormInput} from '@mantine/form/lib/types';
import {yupResolver} from '@mantine/form';
import *  as yup from 'yup'

const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
})


export type LoginInterface = yup.InferType<typeof loginSchema>

export const login: UseFormInput<LoginInterface> = {
    initialValues: {
        password: '',
        email: ''
    },
    validate: yupResolver(loginSchema)
}
