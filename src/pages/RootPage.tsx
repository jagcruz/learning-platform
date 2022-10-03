import type { FC } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const RootPage: FC = () => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
        >
            <Typography variant='h1'>Welcome!</Typography>

            <Typography variant='h5' sx={{ width: 500 }}>
                {
                    "This application is intended to serve as a test while I learn about different web development tools and technologies, especially for frontend. Please don't look at the UI/UX as it is still under development."
                }
            </Typography>

            <Typography
                variant='subtitle1'
                color='error.dark'
                sx={{
                    width: 500,
                    textAlign: 'right',
                    fontWeight: 'bolder',
                    fontStyle: 'italic'
                }}
            >
                J.A.G.C.
            </Typography>
        </Box>
    );
};

export default RootPage;
