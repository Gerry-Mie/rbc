import {UseFormInput} from '@mantine/form/lib/types';
import {yupResolver} from '@mantine/form';
import *  as yup from 'yup'

const sundayServiceSchema = yup.object({
    speaker: yup.string().required().min(2),
    songLeader: yup.string().required().min(2),
    date: yup.string().required(),
    songs: yup.string().required('Date of Birth is Required'),
    speakerIsVisitor: yup.boolean(),
    songLoaderIsVisitor: yup.boolean()
})


export type AddMemberInterface = yup.InferType<typeof sundayServiceSchema>

export const sundayServiceEventForm: UseFormInput<AddMemberInterface> = {
    initialValues: {
        speakerIsVisitor: false,
        date: '',
        songLeader: '',
        songLoaderIsVisitor: false,
        songs: '',
        speaker: ''
    },
    validate: yupResolver(sundayServiceSchema)
}
