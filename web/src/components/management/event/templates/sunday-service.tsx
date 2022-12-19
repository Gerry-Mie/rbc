import {Checkbox, Grid, Select, Textarea, TextInput, Title} from '@mantine/core';
import useMemberByType from '../../../../hooks/firestore/use-member-by-type';
import SelectItemAvatar from '../../../app/select/selecItem/select-item-avatar';
import {DatePicker} from '@mantine/dates';
import {useForm} from '@mantine/form';
import {sundayServiceEventForm} from '../../../../forms/sunday-service-event.form';
import {useEffect} from 'react';

const SundayService = () => {

    const {data: pastors} = useMemberByType('pastor')
    const {data: members} = useMemberByType('member')
    const f = useForm(sundayServiceEventForm)

    useEffect(() => f.setFieldValue('speaker', ''), [f.values.speakerIsVisitor])
    useEffect(() => f.setFieldValue('songLeader', ''), [f.values.songLoaderIsVisitor])

    return (
        <div>
            <Title order={4}>Sunday Service</Title>
            <Grid mt={20}>
                <Grid.Col sm={6}>
                    {
                        f.values.speakerIsVisitor ? (
                            <TextInput
                                label="Speaker"
                                {...f.getInputProps('speaker')}/>
                        ) : (
                            <Select
                                label="Speaker"
                                itemComponent={SelectItemAvatar}
                                data={pastors.map(v => ({
                                    value: v.docId,
                                    label: 'Ptr. ' + v.firstname + ' ' + v.lastname,
                                    image: v.photoUrl
                                }))}
                                {...f.getInputProps('speaker')}/>
                        )
                    }

                    <Checkbox
                        mt="xs"
                        label="visitor"
                        {...f.getInputProps('speakerIsVisitor', {type: 'checkbox'})}/>
                </Grid.Col>
                <Grid.Col sm={6}>
                    {
                        f.values.songLoaderIsVisitor ? (
                            <TextInput
                                label="Song Leader"
                                {...f.getInputProps('songLeader')}/>
                        ) : (
                            <Select
                                label="Song Leader"
                                itemComponent={SelectItemAvatar}
                                data={members.map(v => ({
                                    value: v.docId,
                                    label: v.firstname + ' ' + v.lastname,
                                    image: v.photoUrl
                                }))}
                                {...f.getInputProps('songLeader')}/>
                        )
                    }

                    <Checkbox
                        mt="xs"
                        label="visitor"
                        {...f.getInputProps('songLoaderIsVisitor', {type: 'checkbox'})}/>
                </Grid.Col>
                <Grid.Col sm={6}>
                    <DatePicker
                        label="Date"
                        minDate={new Date()}
                        excludeDate={(date) => (
                            date.getDay() !== 0
                        )}
                    />
                </Grid.Col>

                <Grid.Col sm={6}>
                    <TextInput label="Call to Worship"/>
                </Grid.Col>
                <Grid.Col sm={6}>
                    <TextInput label="Opening Prayer"/>
                </Grid.Col>
                <Grid.Col sm={6}>
                    <TextInput label="Scripture Reading"/>
                </Grid.Col>
                <Grid.Col sm={6}>
                    <TextInput label="Tithes & Offering"/>
                </Grid.Col>
                {/*<Grid.Col sm={6}>*/}
                {/*    <TextInput label=""/>*/}
                {/*</Grid.Col>*/}
                <Grid.Col >
                    <Textarea label="Special number"/>
                </Grid.Col>
                <Grid.Col >
                    <Textarea label="Songs"/>
                </Grid.Col>

            </Grid>
        </div>
    );
}

export default SundayService;
