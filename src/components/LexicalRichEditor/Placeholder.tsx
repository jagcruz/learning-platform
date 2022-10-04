import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';

interface PlaceholderProps {
    text?: string;
}

const Placeholder: FC<PlaceholderProps> = ({ text }) => {
    const { t } = useTranslation();

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
            {`${t(text ?? 'Enter some text')}...`}
        </Box>
    );
};

export default Placeholder;
