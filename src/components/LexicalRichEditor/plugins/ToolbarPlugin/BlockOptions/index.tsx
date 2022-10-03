import type { FC, MouseEvent } from 'react';
import type { LexicalEditor } from 'lexical';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
    BlockType,
    SUPPORTED_BLOCK_TYPES,
    BLOCK_TYPE_NAMES,
    BLOCK_TYPE_ICONS
} from './definitions';
import BlockItems from './items';

export type { BlockType } from './definitions';
export { SUPPORTED_BLOCK_TYPES } from './definitions';

interface BlockOptionsProps {
    editor: LexicalEditor;
    blockType: BlockType;
}

const BlockOptions: FC<BlockOptionsProps> = ({ blockType, editor }) => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const Icon = BLOCK_TYPE_ICONS[blockType];

    const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Box py={1}>
            <Button
                id='formatting-options-button'
                variant='contained'
                size='small'
                onClick={handleOpenMenu}
                startIcon={<Icon />}
                endIcon={<ExpandMoreIcon />}
                aria-label='Formatting Options'
                aria-haspopup='true'
                aria-owns={anchorEl ? 'formatting-options-menu' : null}
                aria-controls={anchorEl ? 'formatting-options-menu' : undefined}
                aria-expanded={anchorEl ? 'true' : undefined}
                sx={{
                    width: 165,
                    whiteSpace: 'nowrap',
                    fontSize: '0.7rem',
                    justifyContent: 'space-between'
                }}
            >
                {BLOCK_TYPE_NAMES[blockType]}
            </Button>

            <Menu
                id='formatting-options-menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'formatting-options-button',
                    sx: { textAlign: 'center', minWidth: 160 }
                }}
            >
                <Typography color='inherit' variant='caption' gutterBottom>
                    {t('Formatting Options')}
                </Typography>

                <Divider sx={{ my: 0.5 }} />

                {Array.from(SUPPORTED_BLOCK_TYPES).map((option) => {
                    const Item = BlockItems[option];

                    return (
                        <Item
                            key={`opt-${blockType}`}
                            blockType={blockType}
                            editor={editor}
                            onCloseMenu={handleCloseMenu}
                        />
                    );
                })}
            </Menu>
        </Box>
    );
};

export default BlockOptions;
