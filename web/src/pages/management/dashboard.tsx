import useNavSelector from '../../hooks/useNavSelector';
import { useDocumentTitle, useMediaQuery } from '@mantine/hooks';
import { Box, Flex, Title } from '@mantine/core';
import { IconUsers, IconCalendarEvent, IconGift } from '@tabler/icons';
import useCollectionCount from '../../hooks/firestore/use-collection-count';
import CountWidget from '../../components/management/dashboard/widgets/count-widget';
import AttendanceGraph from '../../components/management/dashboard/attendance-graph';


const Dashboard = () => {

    useNavSelector('Dashboard')
    useDocumentTitle('Dashboard | RBC')
    const memberCount = useCollectionCount('members')
    useMediaQuery('')

    return (
        <>
            <Title order={2}>Dashboard</Title>


            <Box mt={30}>
                <Title order={4}>Counts</Title>
                <Flex gap={20} wrap="wrap" mt={15}>
                    <CountWidget
                        label="Members"
                        Icon={IconUsers}
                        loading={memberCount.loading}
                        error={memberCount.error}
                        count={memberCount.data}
                        color="#F59F00"/>
                    <CountWidget
                        label="Upcoming Events"
                        Icon={IconCalendarEvent} count={1}
                        color="#40C057"/>
                    <CountWidget
                        label="Birthdays"
                        Icon={IconGift}
                        count={5} color="#FF6B6B"/>
                </Flex>
            </Box>

            <Box mt={30}>
                <AttendanceGraph/>
            </Box>
        </>
    )
}
export default Dashboard
