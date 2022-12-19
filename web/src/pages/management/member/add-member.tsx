import React, {useState} from 'react';
import {Button, Grid, Paper, Select, Textarea, TextInput, Title} from '@mantine/core';
import {DatePicker} from '@mantine/dates';
import useNavSelector from '../../../hooks/useNavSelector';
import {useDocumentTitle} from '@mantine/hooks';
import {useForm,} from '@mantine/form';
import {addMemberForm, AddMemberInterface} from '../../../forms/add-member.form';
import {addMemberFunction} from '../../../firebase/functions';
import {showNotification} from '@mantine/notifications';
import {HttpsCallableResult} from 'firebase/functions'

const AddMember = () => {

    useNavSelector('Add Member')
    useDocumentTitle('Add Member | RBC')
    const f = useForm(addMemberForm)
    const [isSubmitting, setSubmitting] = useState<boolean>(false)

    const submit = async (values: AddMemberInterface) => {
        setSubmitting(true)
        try {
            const {data}: HttpsCallableResult<any> = await addMemberFunction(values)
            if (data?.error) {
                showNotification({
                    title: 'Error',
                    message: data.error.message,
                    color: 'red'
                })
            } else {
                showNotification({
                    title: 'Success',
                    message: 'Member added successfully',
                    color: 'green'
                })
                f.reset()
            }

        } catch (err) {
            showNotification({
                title: 'Error',
                message: 'Something went wrong',
                color: 'red'
            })
        }
        setSubmitting(false)
    }

    return (
        <>
            <Title order={2}>Add Member</Title>

            <Paper mt={30} maw={1200} p='md'>
                <Title order={5}>Required Information</Title>
                <form onSubmit={f.onSubmit(submit)}>
                    <Grid mt={15}>
                        <Grid.Col xs={12} sm={6}>
                            <TextInput label="Firstname" {...f.getInputProps('firstname')}/>
                        </Grid.Col>
                        <Grid.Col xs={12} sm={6}>
                            <TextInput label="Lastname" {...f.getInputProps('lastname')}/>
                        </Grid.Col>
                        <Grid.Col xs={12} sm={6}>
                            <DatePicker
                                {...f.getInputProps('dob')}
                                placeholder="Pick date"
                                maxDate={new Date()}
                                label="Date of birth"/>
                        </Grid.Col>
                        <Grid.Col xs={12} sm={6}>
                            <Select
                                {...f.getInputProps('type')}
                                label="Type"
                                placeholder="Pick one"
                                data={[
                                    {value: 'member', label: 'Member'},
                                    {value: 'pastor', label: 'Pastor'},
                                ]}
                            />
                        </Grid.Col>

                    </Grid>

                    <Title order={5} mt={30}>Optional Information</Title>
                    <Grid mt={15}>
                        <Grid.Col xs={12} sm={6}>
                            <TextInput label="Contact Number" {...f.getInputProps('contactNumber')}/>
                        </Grid.Col>
                        <Grid.Col xs={12} sm={6}>
                            <TextInput label="Email" {...f.getInputProps('email')}/>
                        </Grid.Col>
                        <Grid.Col xs={12}>
                            <Textarea label="Address" {...f.getInputProps('address')}/>
                        </Grid.Col>

                        <Grid.Col xs={12} mt={15}>
                            <Button type="submit" w={150} loading={isSubmitting}>submit</Button>
                        </Grid.Col>
                    </Grid>
                </form>
            </Paper>
            <div style={{height: '200vh'}}></div>
        </>
    );
};

export default AddMember;
