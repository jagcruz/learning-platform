import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

const Sidebar: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    return (
        <Drawer
            anchor='left'
            open={isOpen}
            onClose={onClose}
            variant='temporary'
            elevation={9}
        >
            <Box height='100%' width={300} pt={5} px={2}>
                <Button
                    fullWidth
                    onClick={() => {
                        onClose();
                        navigate('/home');
                    }}
                    variant='contained'
                >
                    Go Home
                </Button>

                <Button
                    fullWidth
                    variant='contained'
                    onClick={() => {
                        onClose();
                        navigate('/lexical');
                    }}
                    sx={{ mt: 1 }}
                >
                    Materialized Lexical Editor
                </Button>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
