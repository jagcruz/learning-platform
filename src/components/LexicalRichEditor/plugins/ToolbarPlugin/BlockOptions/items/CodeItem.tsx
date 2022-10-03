import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $wrapLeafNodesInElements } from '@lexical/selection';
import { $createCodeNode } from '@lexical/code';
import MenuItem from '@mui/material/MenuItem';
import CodeIcon from '@mui/icons-material/Code';

import type { ItemProps } from '../definitions';
import { BLOCK_TYPE_NAMES } from '../definitions';

const CodeListItem: FC<ItemProps> = ({ blockType, editor, onCloseMenu }) => {
    const { t } = useTranslation();

    const formatCode = () => {
        if (blockType !== 'code') {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapLeafNodesInElements(selection, () => $createCodeNode());
                }
            });
        }

        onCloseMenu();
    };

    return (
        <MenuItem
            onClick={formatCode}
            disableRipple
            selected={blockType === 'code'}
            sx={{ fontSize: '0.9rem' }}
        >
            <CodeIcon fontSize='small' sx={{ mr: 0.5 }} />

            {t(BLOCK_TYPE_NAMES.code)}
        </MenuItem>
    );
};

export default CodeListItem;
