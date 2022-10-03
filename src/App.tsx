import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

// import reactLogo from './assets/react.svg';
import routes from 'src/routes';

const App: FC = () => {
    const content = useRoutes(routes);

    return (
        <>
            <CssBaseline />
            <Box width='100vw' height='100vh'>
                {content}
            </Box>
        </>
    );
};

export default App;
