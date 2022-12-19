import useNavSelector from '../../../hooks/useNavSelector';
import {useDocumentTitle} from '@mantine/hooks';
import { Paper, Title} from '@mantine/core';
import React from 'react';
import MemberList from '../../../components/management/member/member-list';

const Members = () => {

    useNavSelector('Members')
    useDocumentTitle('Members | RBC')

    return (
        <>
            <Title order={2}>Members</Title>
            <Paper mt={30} maw={1200}>
                <MemberList/>
            </Paper>
        </>
    )
}
export default Members
