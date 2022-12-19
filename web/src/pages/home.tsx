import Header from '../components/layout/header';
import { useDocumentTitle } from '@mantine/hooks';
import { Box } from '@mantine/core';
import ContactAndLocation from '../components/home/contact-and-location';
import HomeCarousel from '../components/home/home-carousel';

const Home = () => {

    useDocumentTitle(' RBC')

    return (
        <Box sx={theme => ({backgroundColor: theme.colors.scheme[1]})} p={20} pt={70} h="auto">
            <Header/>
            <Box mt={30}>
                <HomeCarousel/>
            </Box>
            <Box mt={90}>
                <ContactAndLocation/>
            </Box>
        </Box>
    )
}

export default Home
