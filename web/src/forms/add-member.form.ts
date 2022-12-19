import {UseFormInput} from '@mantine/form/lib/types';
import {yupResolver} from '@mantine/form';
import *  as yup from 'yup'

const memberSchema = yup.object({
	firstname: yup.string().required().min(2),
	lastname: yup.string().required().min(2),
	type: yup.string().required(),
	dob: yup.string().required('Date of Birth is Required'),
	contactNumber: yup.string(),
	email: yup.string(),
	address: yup.string(),
})


export type AddMemberInterface = yup.InferType<typeof memberSchema>

export const addMemberForm: UseFormInput<AddMemberInterface> = {
	initialValues: {
		firstname: '',
		lastname: '',
		dob: '',
		type: '',

		address: '',
		contactNumber: '',
		email: ''
	},
	validate: yupResolver(memberSchema)
}
