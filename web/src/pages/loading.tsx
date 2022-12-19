import { Flex, Loader } from '@mantine/core';

const Loading = () => {
    return (
        <Flex h='100%' align='center' justify='center'>
            <Loader variant='dots' size={100}/>
        </Flex>
    );
}

export default Loading;
