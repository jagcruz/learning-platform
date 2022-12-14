import type { FC } from 'react';
import type { EditorState } from 'lexical';
import type { InitialEditorStateType } from '@lexical/react/LexicalComposer';
import Box from '@mui/material/Box';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';

import lexicalTheme from './theme';
import Placeholder from './Placeholder';
import CssGlobal from './CssGlobal';
import ContentEditable from './StyledContentEditable';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';

interface LexicalEditorProps {
    namespace: string;
    initialState?: InitialEditorStateType;
    placeholder?: string;
    editable?: boolean;
    debug?: boolean;
    onChangeState?: (editorState: EditorState) => void;
}

const LexicalRichEditor: FC<LexicalEditorProps> = ({
    namespace,
    placeholder,
    initialState,
    editable,
    onChangeState,
    debug
}) => {
    return (
        <LexicalComposer
            initialConfig={{
                editorState: initialState,
                editable: !!editable,
                namespace,
                theme: lexicalTheme,
                onError: (error) => {
                    throw error;
                },
                nodes: [
                    HeadingNode,
                    ListNode,
                    ListItemNode,
                    QuoteNode,
                    CodeNode,
                    CodeHighlightNode,
                    TableNode,
                    TableCellNode,
                    TableRowNode,
                    AutoLinkNode,
                    LinkNode
                ]
            }}
        >
            <CssGlobal />
            <Box
                id='editor-container'
                // margin='20px auto 20px auto'
                borderRadius='2px'
                maxWidth='610px'
                width='100%'
                color='#000'
                position='relative'
                lineHeight='20px'
                fontWeight='400'
                textAlign='left'
                sx={{
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                }}
            >
                <ToolbarPlugin editable={editable} />

                <Box id='editor-inner' bgcolor='#fff' position='relative'>
                    <RichTextPlugin
                        contentEditable={<ContentEditable editable={editable} />}
                        placeholder={<Placeholder text={placeholder} />}
                    />
                    <HistoryPlugin />

                    {debug && <TreeViewPlugin />}

                    <AutoFocusPlugin />
                    <CodeHighlightPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                    <AutoLinkPlugin />
                    <ListMaxIndentLevelPlugin maxDepth={7} />
                    <MarkdownShortcutPlugin transformers={TRANSFORMERS} />

                    {onChangeState && <OnChangePlugin onChange={onChangeState} />}
                </Box>
            </Box>
        </LexicalComposer>
    );
};

export default LexicalRichEditor;
