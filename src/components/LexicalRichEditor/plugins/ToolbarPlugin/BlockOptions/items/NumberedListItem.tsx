import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { INSERT_ORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from '@lexical/list';

import MenuItem from '@mui/material/MenuItem';
import ListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import type { ItemProps } from '../definitions';
import { BLOCK_TYPE_NAMES } from '../definitions';

const NumberedListItem: FC<ItemProps> = ({ blockType, editor, onCloseMenu }) => {
    const { t } = useTranslation();

    const formatNumberedList = () => {
        if (blockType !== 'ol') {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, null);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, null);
        }

        onCloseMenu();
    };

    return (
        <MenuItem
            onClick={formatNumberedList}
            disableRipple
            selected={blockType === 'ol'}
            sx={{ fontSize: '0.9rem' }}
        >
            <ListNumberedIcon fontSize='small' sx={{ mr: 0.5 }} />

            {t(BLOCK_TYPE_NAMES.ol)}
        </MenuItem>
    );
};

export default NumberedListItem;
