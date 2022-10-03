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

        .editor-code: {
            background-color: red !important;
            font-family: Menlo, Consolas, Monaco, monospace;
            display: block;
            padding: 8px 8px 8px 52px;
            line-height: 1.53;
            font-size: 13px;
            margin: 0;
            margin-top: 8px;
            margin-bottom: 8px;
            tab-size: 2;
            /* white-space: pre; */
            overflow-x: auto;
            position: relative;
        }
`
);

export default StyledContentEditable;
