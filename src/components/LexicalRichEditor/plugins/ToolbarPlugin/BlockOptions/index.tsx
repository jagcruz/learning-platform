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

                {SUPPORTED_BLOCK_TYPES.has('paragraph') && (
                    <BlockItems.paragraph
                        blockType={blockType}
                        editor={editor}
                        onCloseMenu={handleCloseMenu}
                    />
                )}

                {SUPPORTED_BLOCK_TYPES.has('h1') && (
                    <BlockItems.h1
                        blockType={blockType}
                        editor={editor}
                        onCloseMenu={handleCloseMenu}
                    />
                )}

                {SUPPORTED_BLOCK_TYPES.has('h2') && (
                    <BlockItems.h2
                        blockType={blockType}
                        editor={editor}
                        onCloseMenu={handleCloseMenu}
                    />
                )}

                {SUPPORTED_BLOCK_TYPES.has('h3') && (
                    <BlockItems.h3
                        blockType={blockType}
                        editor={editor}
                        onCloseMenu={handleCloseMenu}
                    />
                )}

                {SUPPORTED_BLOCK_TYPES.has('h4') && (
                    <BlockItems.h4
                        blockType={blockType}
                        editor={editor}
                        onCloseMenu={handleCloseMenu}
                    />
                )}

                {SUPPORTED_BLOCK_TYPES.has('h5') && (
                    <BlockItems.h5
                        blockType={blockType}
                        editor={editor}
                        onCloseMenu={handleCloseMenu}
                    />
                )}

                {SUPPORTED_BLOCK_TYPES.has('ul') && (
                    <BlockItems.ul
                        blockType={blockType}
                        editor={editor}
                        onCloseMenu={handleCloseMenu}
                    />
                )}

                {SUPPORTED_BLOCK_TYPES.has('ol') && (
                    <BlockItems.ol
                        blockType={blockType}
                        editor={editor}
                        onCloseMenu={handleCloseMenu}
                    />
                )}

                {SUPPORTED_BLOCK_TYPES.has('quote') && (
                    <BlockItems.quote
                        blockType={blockType}
                        editor={editor}
                        onCloseMenu={handleCloseMenu}
                    />
                )}

                {SUPPORTED_BLOCK_TYPES.has('code') && (
                    <BlockItems.code
                        blockType={blockType}
                        editor={editor}
                        onCloseMenu={handleCloseMenu}
                    />
                )}
            </Menu>
        </Box>
    );
};

export default BlockOptions;
