import {useEffect} from 'react';
import {useMantineTheme} from '@mantine/core';

const useMetaTheme = () => {

    const theme = useMantineTheme()

    useEffect(() => {
        // @ts-ignore
        document.querySelector('meta[name="theme-color"]').setAttribute(
            'content', theme.colors.scheme[0]
        );
    }, [theme.colorScheme])
}

export default useMetaTheme;
