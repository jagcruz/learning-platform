import type { FC } from 'react';
import type { Props } from '@lexical/react/LexicalContentEditable';
import { ContentEditable as LexicalContentEditable } from '@lexical/react/LexicalContentEditable';
import styled from '@mui/material/styles/styled';

interface ContentEditableProps extends Props {
    editable?: boolean;
}

const StyledContentEditable = styled(LexicalContentEditable)(
    ({ theme }) => `
        min-height: 150px;
        resize: none;
        font-size: 15px;
        caret-color: rgb(5, 5, 5);
        position: relative;
        tab-size: 1;
        outline: 0;
        padding: 15px 10px;
        caret-color: #444;
        border: 1px solid ${theme.palette.primary.main};
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
`
);

const ContentEditable: FC<ContentEditableProps> = ({ editable, ...rest }) => {
    return (
        <StyledContentEditable
            {...rest}
            sx={{
                borderTopLeftRadius: editable ? 0 : '10px',
                borderTopRightRadius: editable ? 0 : '10px'
            }}
        />
    );
};

export default ContentEditable;
