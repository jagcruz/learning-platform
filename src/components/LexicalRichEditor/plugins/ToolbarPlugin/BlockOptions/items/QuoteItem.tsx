import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $wrapLeafNodesInElements } from '@lexical/selection';
import { $createQuoteNode } from '@lexical/rich-text';
import MenuItem from '@mui/material/MenuItem';
import QuoteIcon from '@mui/icons-material/FormatQuote';

import type { ItemProps } from '../definitions';
import { BLOCK_TYPE_NAMES } from '../definitions';

const QuoteItem: FC<ItemProps> = ({ blockType, editor, onCloseMenu }) => {
    const { t } = useTranslation();

    const formatQuote = () => {
        if (blockType !== 'quote') {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapLeafNodesInElements(selection, () => $createQuoteNode());
                }
            });
        }

        onCloseMenu();
    };

    return (
        <MenuItem
            onClick={formatQuote}
            disableRipple
            selected={blockType === 'quote'}
            sx={{ fontSize: '0.9rem' }}
        >
            <QuoteIcon fontSize='small' sx={{ mr: 0.5 }} />
            {t(BLOCK_TYPE_NAMES.quote)}
        </MenuItem>
    );
};

export default QuoteItem;
