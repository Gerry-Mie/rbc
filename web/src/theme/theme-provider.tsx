import {MantineProvider, ColorSchemeProvider, ColorScheme} from '@mantine/core';
import themeObject from './theme-object';
import {useLocalStorage} from '@mantine/hooks';

const ThemeProvider = (props: any) => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({key: 'color-scheme', defaultValue: 'dark'})

    const toggleColorScheme = (value?: ColorScheme) => {
        const mode = value || (colorScheme === 'dark' ? 'light' : 'dark')
        setColorScheme(mode);
    }

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={themeObject(colorScheme)} withGlobalStyles withNormalizeCSS>
                {props.children}
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
export default ThemeProvider
