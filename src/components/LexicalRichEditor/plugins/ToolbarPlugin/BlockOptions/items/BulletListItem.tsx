import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from '@lexical/list';
import MenuItem from '@mui/material/MenuItem';
import ListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import type { ItemProps } from '../definitions';
import { BLOCK_TYPE_NAMES } from '../definitions';

const BulletListItem: FC<ItemProps> = ({ blockType, editor, onCloseMenu }) => {
    const { t } = useTranslation();

    const formatBulletList = () => {
        if (blockType !== 'ul') {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, null);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, null);
        }

        onCloseMenu();
    };

    return (
        <MenuItem
            onClick={formatBulletList}
            disableRipple
            selected={blockType === 'ul'}
            sx={{ fontSize: '0.9rem' }}
        >
            <ListBulletedIcon fontSize='small' sx={{ mr: 0.5 }} />

            {t(BLOCK_TYPE_NAMES.ul)}
        </MenuItem>
    );
};

export default BulletListItem;
