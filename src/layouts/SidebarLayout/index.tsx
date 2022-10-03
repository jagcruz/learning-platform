import type { FC } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Sidebar from './Sidebar';

const SidebarLayout: FC = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <Sidebar isOpen={isOpen} onClose={() => setOpen(false)} />
            <Box display='flex' flexDirection='column' width='100%' height='100%'>
                <Button onClick={() => setOpen(true)}>Open Menu</Button>

                <Box flex={1} p={2}>
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default SidebarLayout;
