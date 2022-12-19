import { ColorScheme, MantineThemeOverride } from '@mantine/core';

const themeObject = (colorScheme: ColorScheme): MantineThemeOverride => {

    return ({

        globalStyles: theme => ({
            body: {
                fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
            },
            '*': {
                padding: 0,
                margin: 0,
                boxSizing: 'border-box',
            },

            '#root': {
                height: '100vh'
            },
        }),

        colorScheme,

        fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',

        primaryShade: {
            dark: 7,
            light: 7
        },

        white: '#F5F8FA',

        colors: {
            /**
             * colors.scheme
             *
             * 0 background top
             * 1 background back
             * 2 color
             * 3 color gray
             * 4 dimmed - light
             */
            scheme: colorScheme === 'dark'
                ? [
                    // dark
                    '#242a30', // 0
                    '#202326', // 1
                    '#bfc0c3', // 2
                    '#b7b8bb', // 3
                    '#373A40', // 4
                    '#2C2E33',
                    '#242a30',
                    '#242a30',
                    '#141517',
                    '#101113']
                : [
                    // light
                    '#F5F8FA', // 0 theme.white
                    '#dee8ee', // 1
                    '#000', // 2
                    '#dee2e6', // 3
                    '#ced4da', // 4
                    '#adb5bd',
                    '#868e96',
                    '#495057',
                    '#343a40',
                    '#212529'
                ],
            dark: [
                '#C1C2C5',
                '#A6A7AB',
                '#909296',
                '#5c5f66',
                '#373A40',
                '#2C2E33',
                '#2c333b',// 7 edited
                '#242a30',// 8 edited
                '#141517',
                '#101113'
            ],
            gray: [
                '#ffffff',
                '#f1f3f5',
                '#e9ecef',
                '#dee2e6',
                '#ced4da',
                '#adb5bd',
                '#868e96',
                '#495057',
                '#343a40',
                '#212529'
            ]
        },

        components: {
            Button: {

                styles: theme => ({
                    label: {
                        color: colorScheme === 'dark' ? '#cecece' : theme.white
                    }
                })
            },
            Input: {

                styles: theme => ({
                    input: {
                        backgroundColor: 'transparent'
                    }
                })
            },
        },
    })
}

export default themeObject
