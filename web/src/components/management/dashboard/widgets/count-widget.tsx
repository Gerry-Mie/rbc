import { Flex, Loader, Paper, Text, Title } from '@mantine/core';
import { TablerIcon, IconFaceIdError } from '@tabler/icons';

interface Props {
    Icon: TablerIcon
    label: string,
    count: number,

    color: string,
    loading?: boolean,

    error?: boolean
}

const CountWidget = ({Icon, label, count, color, loading = false, error = false}: Props) => {

    return (
        <Paper p="md" sx={{ flexGrow: 1}}>
            <Flex direction="column" justify="space-between" gap="sm" h='100%'>
                <Flex gap={30} justify="space-between">
                    <Text color="dimmed">{label}</Text>
                    <Icon color={color}/>
                </Flex>
                {loading ? <Loader/> : error ? <IconFaceIdError/> : <Title>{count}</Title>
                }
            </Flex>
        </Paper>
    );
}

export default CountWidget;
