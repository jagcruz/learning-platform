import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import styled from '@mui/material/styles/styled';

const StyledContentEditable = styled(ContentEditable)(
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

export default StyledContentEditable;
