import {Box, createStyles} from '@mantine/core';

const useStyle = createStyles(() => ({
    map_iframe: {
        width: '100%',
        height: '100%',
    }
}))


const Map = () => {
    const {classes} = useStyle()
    return (
        <Box sx={{overflow: 'hidden', borderRadius: 10}} h={400} >
            <iframe className={classes.map_iframe}
                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=14.692495, 121.070640&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
        </Box>
    );
}

export default Map;
