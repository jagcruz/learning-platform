import type { FC } from 'react';
import { $getSelection, $isRangeSelection, $createParagraphNode } from 'lexical';
import { $wrapLeafNodesInElements } from '@lexical/selection';
import { useTranslation } from 'react-i18next';
import MenuItem from '@mui/material/MenuItem';
import ParagraphIcon from '@mui/icons-material/Notes';

import type { ItemProps } from '../definitions';
import { BLOCK_TYPE_NAMES } from '../definitions';

const ParagraphItem: FC<ItemProps> = ({ blockType, editor, onCloseMenu }) => {
    const { t } = useTranslation();

    const formatParagraph = () => {
        if (blockType !== 'paragraph') {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapLeafNodesInElements(selection, () => $createParagraphNode());
                }
            });
        }

        onCloseMenu();
    };

    return (
        <MenuItem
            onClick={formatParagraph}
            disableRipple
            selected={blockType === 'paragraph'}
            sx={{ fontSize: '0.9rem' }}
        >
            <ParagraphIcon fontSize='small' sx={{ mr: 0.5 }} />

            {t(BLOCK_TYPE_NAMES.paragraph)}
        </MenuItem>
    );
};

export default ParagraphItem;
