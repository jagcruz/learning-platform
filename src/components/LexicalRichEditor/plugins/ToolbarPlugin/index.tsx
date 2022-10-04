import type { FC } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    REDO_COMMAND,
    UNDO_COMMAND,
    SELECTION_CHANGE_COMMAND,
    FORMAT_TEXT_COMMAND,
    FORMAT_ELEMENT_COMMAND,
    $getSelection,
    $isRangeSelection,
    $getNodeByKey
} from 'lexical';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { $isListNode, ListNode } from '@lexical/list';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isCodeNode, getDefaultCodeLanguage } from '@lexical/code';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import AlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import AlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import AlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import AlignRightIcon from '@mui/icons-material/FormatAlignRight';
import BoldIcon from '@mui/icons-material/FormatBold';
import CodeIcon from '@mui/icons-material/Code';
import ItalicIcon from '@mui/icons-material/FormatItalic';
import LinkIcon from '@mui/icons-material/Link';
import RedoIcon from '@mui/icons-material/Redo';
import StrikethroughIcon from '@mui/icons-material/StrikethroughS';
import UnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import UndoIcon from '@mui/icons-material/Undo';

import type { BlockType } from './BlockOptions';
import { getSelectedNode, LOW_PRIORITY } from './utils';
import BlockOptions, { SUPPORTED_BLOCK_TYPES } from './BlockOptions';
import FloatingLinkEditor from './FloatingLinkEditor';
import CodeLangSelector from './CodeLangSelector';

interface ToolbarPluginProps {
    editable?: boolean;
}

const ToolbarPlugin: FC<ToolbarPluginProps> = ({ editable }) => {
    const [editor] = useLexicalComposerContext();
    const toolbarRef = useRef(null);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [blockType, setBlockType] = useState<BlockType>('paragraph');
    const [selectedElementKey, setSelectedElementKey] = useState(null);
    const [codeLanguage, setCodeLanguage] = useState('');
    const [isLink, setIsLink] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isCode, setIsCode] = useState(false);

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();
            const element =
                anchorNode.getKey() === 'root'
                    ? anchorNode
                    : anchorNode.getTopLevelElementOrThrow();
            const elementKey = element.getKey();
            const elementDOM = editor.getElementByKey(elementKey);

            if (elementDOM !== null) {
                setSelectedElementKey(elementKey);

                if ($isListNode(element)) {
                    const parentList = $getNearestNodeOfType(anchorNode, ListNode);
                    const type = (
                        parentList ? parentList.getTag() : element.getTag()
                    ) as BlockType;

                    setBlockType(type);
                } else {
                    const type = (
                        $isHeadingNode(element) ? element.getTag() : element.getType()
                    ) as BlockType;

                    setBlockType(type);

                    if ($isCodeNode(element)) {
                        setCodeLanguage(
                            element.getLanguage() || getDefaultCodeLanguage()
                        );
                    }
                }
            }

            // Update text format
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));
            setIsCode(selection.hasFormat('code'));

            // Update links
            const node = getSelectedNode(selection);
            const parent = node.getParent();

            if ($isLinkNode(parent) || $isLinkNode(node)) {
                setIsLink(true);
            } else {
                setIsLink(false);
            }
        }
    }, [editor]);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateToolbar();
                });
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, _newEditor) => {
                    updateToolbar();
                    return false;
                },
                LOW_PRIORITY
            ),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload);
                    return false;
                },
                LOW_PRIORITY
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload);
                    return false;
                },
                LOW_PRIORITY
            )
        );
    }, [editor, updateToolbar]);

    const onCodeLanguageSelect = useCallback(
        (e) => {
            editor.update(() => {
                if (selectedElementKey !== null) {
                    const node = $getNodeByKey(selectedElementKey);

                    if ($isCodeNode(node)) {
                        node.setLanguage(e.target.value);
                    }
                }
            });
        },
        [editor, selectedElementKey]
    );

    const insertLink = useCallback(() => {
        if (!isLink) {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
        } else {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        }
    }, [editor, isLink]);

    return (
        <Grid
            id='toolbar'
            ref={toolbarRef}
            container
            alignItems='center'
            justifyContent='center'
            p={1}
            border={1}
            borderColor='primary.main'
            bgcolor='background.paper'
            width='100%'
            sx={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10
            }}
        >
            <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                <Tooltip arrow title='Undo'>
                    <span>
                        <IconButton
                            aria-label='Undo'
                            size='small'
                            onClick={() => {
                                editor.dispatchCommand(UNDO_COMMAND, null);
                            }}
                            disabled={!canUndo}
                            color={canUndo ? 'primary' : 'default'}
                            sx={{ mr: 0.5 }}
                        >
                            <UndoIcon fontSize='small' />
                        </IconButton>
                    </span>
                </Tooltip>

                <Tooltip arrow title='Redo'>
                    <span>
                        <IconButton
                            aria-label='Redo'
                            size='small'
                            onClick={() => {
                                editor.dispatchCommand(REDO_COMMAND, null);
                            }}
                            disabled={!canRedo}
                            color={canRedo ? 'primary' : 'default'}
                        >
                            <RedoIcon fontSize='small' />
                        </IconButton>
                    </span>
                </Tooltip>
            </Grid>

            <Divider flexItem orientation='vertical' sx={{ mx: 0.5 }} />

            {SUPPORTED_BLOCK_TYPES.has(blockType) && (
                <>
                    <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                        <BlockOptions blockType={blockType} editor={editor} />
                    </Grid>

                    <Hidden smDown>
                        <Divider flexItem orientation='vertical' sx={{ mx: 0.5 }} />
                    </Hidden>
                </>
            )}

            {blockType === 'code' ? (
                <Grid item xs sm md lg xl>
                    <CodeLangSelector
                        onChange={onCodeLanguageSelect}
                        codeLanguage={codeLanguage}
                    />
                </Grid>
            ) : (
                <>
                    <Grid item>
                        <Tooltip arrow title='Format Bold'>
                            <IconButton
                                aria-label='Format Bold'
                                size='small'
                                onClick={() => {
                                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                                }}
                                color={isBold ? 'primary' : 'default'}
                                sx={{ mr: 0.5 }}
                            >
                                <BoldIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip arrow title='Format Italics'>
                            <IconButton
                                aria-label='Format Italics'
                                size='small'
                                onClick={() => {
                                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
                                }}
                                color={isItalic ? 'primary' : 'default'}
                                sx={{ mr: 0.5 }}
                            >
                                <ItalicIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip arrow title='Format Underline'>
                            <IconButton
                                aria-label='Format Underline'
                                size='small'
                                onClick={() => {
                                    editor.dispatchCommand(
                                        FORMAT_TEXT_COMMAND,
                                        'underline'
                                    );
                                }}
                                color={isUnderline ? 'primary' : 'default'}
                                sx={{ mr: 0.5 }}
                            >
                                <UnderlinedIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip arrow title='Format Strikethrough'>
                            <IconButton
                                aria-label='Format Strikethrough'
                                size='small'
                                onClick={() => {
                                    editor.dispatchCommand(
                                        FORMAT_TEXT_COMMAND,
                                        'strikethrough'
                                    );
                                }}
                                color={isStrikethrough ? 'primary' : 'default'}
                                sx={{ mr: 0.5 }}
                            >
                                <StrikethroughIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip arrow title='Insert Code'>
                            <IconButton
                                aria-label='Insert Code'
                                size='small'
                                onClick={() => {
                                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
                                }}
                                color={isCode ? 'primary' : 'default'}
                                sx={{ mr: 0.5 }}
                            >
                                <CodeIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip arrow title='Insert Link'>
                            <IconButton
                                aria-label='Insert Link'
                                size='small'
                                onClick={insertLink}
                                color={isLink ? 'primary' : 'default'}
                            >
                                <LinkIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>

                        {isLink && (
                            <FloatingLinkEditor editor={editor} editable={editable} />
                        )}
                    </Grid>

                    <Hidden smDown>
                        <Divider flexItem orientation='vertical' sx={{ mx: 0.5 }} />
                    </Hidden>

                    <Grid item>
                        <Tooltip arrow title='Left Align'>
                            <IconButton
                                aria-label='Left Align'
                                size='small'
                                onClick={() => {
                                    editor.dispatchCommand(
                                        FORMAT_ELEMENT_COMMAND,
                                        'left'
                                    );
                                }}
                                sx={{ mr: 0.5 }}
                            >
                                <AlignLeftIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip arrow title='Center Align'>
                            <IconButton
                                aria-label='Center Align'
                                size='small'
                                onClick={() => {
                                    editor.dispatchCommand(
                                        FORMAT_ELEMENT_COMMAND,
                                        'center'
                                    );
                                }}
                                sx={{ mr: 0.5 }}
                            >
                                <AlignCenterIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip arrow title='Right Align'>
                            <IconButton
                                aria-label='Right Align'
                                size='small'
                                onClick={() => {
                                    editor.dispatchCommand(
                                        FORMAT_ELEMENT_COMMAND,
                                        'right'
                                    );
                                }}
                                sx={{ mr: 0.5 }}
                            >
                                <AlignRightIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip arrow title='Justify Align'>
                            <IconButton
                                aria-label='Justify Align'
                                size='small'
                                onClick={() => {
                                    editor.dispatchCommand(
                                        FORMAT_ELEMENT_COMMAND,
                                        'justify'
                                    );
                                }}
                            >
                                <AlignJustifyIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default ToolbarPlugin;
