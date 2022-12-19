import { Accordion, Avatar, Divider, Flex, Grid, Text, Title } from '@mantine/core';
import useMembers from '../../../hooks/firestore/use-members';
import UserInterface from '../../../types/user-interface';
import { UserKeyInterface } from '../../../types';
import { userLabels } from '../../../constants/user-labels';
import CreateAccount from '../../../pages/management/member/create-account';

const MemberList = () => {

    const {loading, data} = useMembers()
    if (loading) return <h1>loading</h1>

    const items = data.map((user: any) => (
        <Accordion.Item value={user.docId} key={user.docId}>
            <Control v={user}/>
            <Panel user={user}/>
        </Accordion.Item>
    ))

    return <Accordion sx={{border: 'none'}} chevronPosition="right" variant="filled">{items}</Accordion>
}

const Control = ({v}: any) => (
    <Accordion.Control>
        <Flex align="center" gap="sm">
            <Avatar radius="xl" src={v.photoUrl} alt="g"/>
            <div>
                <Title order={4}>{v.firstname} {v.lastname}</Title>
                <Text c="dimmed" fz="sm">{v.type}</Text>
            </div>
        </Flex>
    </Accordion.Control>
)

interface Props {
    user: UserInterface
}

interface UserInfo {
    label: string,
    value: string
}

const Panel = ({user}: Props) => {

    const userInfo = () => {
        const infos: UserInfo[] = []
        let i: UserKeyInterface
        for (i in userLabels) {
            const info = user[i]

            if (info) {
                let value = user[i] || ''
                if (i === 'dob') {
                    value = (new Date(value)).toLocaleDateString()
                }
                infos.push({
                    label: userLabels[i] || '',
                    value: value
                })
            }
        }
        return infos
    }

    return (
        <Accordion.Panel>
            <Grid>
                {userInfo().map(({label, value}) => (
                    <Grid.Col sm={6} key={label}>
                        <Text color="dimmed">{label} </Text>
                        <Text>{value}</Text>
                        <Divider/>
                    </Grid.Col>
                ))}
                <CreateAccount user={user}/>
            </Grid>
        </Accordion.Panel>
    )
}

export default MemberList;
