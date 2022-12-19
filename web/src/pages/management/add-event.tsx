import {Box, Paper, Title} from '@mantine/core';
import React from 'react';
import useNavSelector from '../../hooks/useNavSelector';
import {useDocumentTitle} from '@mantine/hooks';
import SundayService from '../../components/management/event/templates/sunday-service';

const AddEvent = () => {
    useNavSelector('Add Event')
    useDocumentTitle('Add Event | RBC')
    return (
        <Box>
            <Title order={2}>Add Event</Title>

            <Paper mt={30} p='md'>
               <SundayService/>
            </Paper>
        </Box>
    );
}

export default AddEvent;
