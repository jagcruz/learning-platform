import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $wrapLeafNodesInElements } from '@lexical/selection';
import { $createHeadingNode } from '@lexical/rich-text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa1 } from '@fortawesome/free-solid-svg-icons/fa1';
import { faHeading } from '@fortawesome/free-solid-svg-icons/faHeading';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

import type { ItemProps } from '../definitions';
import { BLOCK_TYPE_NAMES } from '../definitions';

const Heading1Item: FC<ItemProps> = ({ blockType, editor, onCloseMenu }) => {
    const { t } = useTranslation();

    const formatLargeHeading = () => {
        if (blockType !== 'h1') {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapLeafNodesInElements(selection, () => $createHeadingNode('h1'));
                }
            });
        }

        onCloseMenu();
    };

    return (
        <MenuItem
            onClick={formatLargeHeading}
            disableRipple
            selected={blockType === 'h1'}
            sx={{ fontSize: '0.9rem' }}
        >
            <Box component='span' className='fa-layers fa-fw' mr={0.5} pr={0.1}>
                <FontAwesomeIcon icon={faHeading} transform='shrink-5 left-3' />
                <FontAwesomeIcon icon={fa1} transform='shrink-5 right-7' />
            </Box>

            {t(BLOCK_TYPE_NAMES.h1)}
        </MenuItem>
    );
};

export default Heading1Item;
