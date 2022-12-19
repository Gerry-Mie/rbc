import {Box, Flex, Paper, Text, Title} from '@mantine/core';
import Map from './map';
import {useMediaQuery} from '@mantine/hooks';

const ContactAndLocation = () => {
    const matches = useMediaQuery('(max-width: 992px)')
    return (
        <Paper p="md">
            <Flex direction={matches ? 'column' : 'row'} gap={30} align="center" justify="center">
                <Flex w={matches ? '100%' : 700} align="center" justify="center">
                    <Box>
                        <Title order={3}>Contacts and Location</Title>
                        <Text pt={matches ? 50 : 90}>Contact Number: 09XXXXXXXXX</Text>
                        <Text>email: xxxx@xxx.xxx</Text>
                        <Text>Address: xxxxxxx, xxxxxxxxxx, xxxxxxx</Text>
                    </Box>
                </Flex>
                <Box w="100%" maw={600}>
                    <Map/>
                </Box>
            </Flex>
        </Paper>
    );
}

export default ContactAndLocation;
