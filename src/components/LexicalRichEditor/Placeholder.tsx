import type { FC } from 'react';
import Box from '@mui/material/Box';

const Placeholder: FC = () => {
    return (
        <Box
            id='editor-placeholder'
            sx={{
                color: '#999',
                overflow: 'hidden',
                position: 'absolute',
                textOverflow: 'ellipsis',
                top: '15px',
                left: '10px',
                fontSize: '15px',
                userSelect: 'none',
                display: 'inline-block',
                pointerEvents: 'none'
            }}
        >
            Enter some rich text...
        </Box>
    );
};

export default Placeholder;
