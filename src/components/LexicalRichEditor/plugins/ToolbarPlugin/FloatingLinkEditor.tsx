/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { FC } from 'react';
import type { LexicalEditor } from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SELECTION_CHANGE_COMMAND, $getSelection, $isRangeSelection } from 'lexical';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { mergeRegister } from '@lexical/utils';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { getSelectedNode, LOW_PRIORITY } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function positionEditorElement(editor, rect: DOMRect) {
    if (rect === null) {
        editor.style.opacity = '0';
        editor.style.top = '-1000px';
        editor.style.left = '-1000px';
    } else {
        editor.style.opacity = '1';
        editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
        editor.style.left = `${
            rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2
        }px`;
    }
}

interface FloatingLinkEditorProps {
    editor: LexicalEditor;
    editable?: boolean;
}

const FloatingLinkEditor: FC<FloatingLinkEditorProps> = ({ editor, editable }) => {
    const { t } = useTranslation();
    const editorRef = useRef(null);
    const inputRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement | Element>(null);
    // const mouseDownRef = useRef(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [isEditMode, setEditMode] = useState(false);
    const [lastSelection, setLastSelection] = useState(null);

    const updateLinkEditor = useCallback(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
            const node = getSelectedNode(selection);
            const parent = node.getParent();

            if ($isLinkNode(parent)) {
                setLinkUrl(parent.getURL());
            } else if ($isLinkNode(node)) {
                setLinkUrl(node.getURL());
            } else {
                setLinkUrl('');
            }
        }

        const editorElem = editorRef.current;
        const nativeSelection = window.getSelection();
        const activeElement = document.activeElement;
        setAnchorEl(activeElement);

        if (editorElem === null) {
            return;
        }

        const rootElement = editor.getRootElement();

        if (
            selection !== null &&
            !nativeSelection.isCollapsed &&
            rootElement !== null &&
            rootElement.contains(nativeSelection.anchorNode)
        ) {
            const domRange = nativeSelection.getRangeAt(0);
            let rect;
            if (nativeSelection.anchorNode === rootElement) {
                let inner: Element = rootElement;

                while (inner.firstElementChild != null) {
                    inner = inner.firstElementChild;
                }

                rect = inner.getBoundingClientRect();
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                rect = domRange.getBoundingClientRect();
            }

            // if (!mouseDownRef.current) {
            //     positionEditorElement(editorElem, rect);
            // }

            setLastSelection(selection);
        } else if (!activeElement || activeElement.id !== 'link-input') {
            // positionEditorElement(editorElem, null);
            setLastSelection(null);
            setEditMode(false);
            setLinkUrl('');
        }

        return true;
    }, [editor]);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateLinkEditor();
                });
            }),

            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                () => {
                    updateLinkEditor();
                    return true;
                },
                LOW_PRIORITY
            )
        );
    }, [editor, updateLinkEditor]);

    useEffect(() => {
        editor.getEditorState().read(() => {
            updateLinkEditor();
        });
    }, [editor, updateLinkEditor]);

    const saveEdit = () => {
        if (lastSelection !== null) {
            if (linkUrl !== '') {
                editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
            }

            setEditMode(false);
        }
    };

    const cancelEdit = () => {
        setEditMode(false);
    };

    return (
        <Popper
            open={!!linkUrl}
            anchorEl={anchorEl}
            placement='top-start'
            modifiers={[
                {
                    name: 'flip',
                    enabled: true,
                    options: {
                        altBoundary: true,
                        rootBoundary: 'document',
                        padding: 8
                    }
                },
                {
                    name: 'preventOverflow',
                    enabled: true,
                    options: {
                        altAxis: true,
                        altBoundary: true,
                        tether: true,
                        rootBoundary: 'viewport',
                        padding: 8
                    }
                }
            ]}
        >
            <Paper
                ref={editorRef}
                elevation={3}
                sx={{ p: 1, m: 1, border: 1, borderColor: 'primary.dark' }}
            >
                {isEditMode ? (
                    <Box id='link-input' display='flex' alignItems='center'>
                        <IconButton size='small' color='error' onClick={cancelEdit}>
                            <CloseIcon fontSize='small' />
                        </IconButton>

                        <IconButton
                            size='small'
                            color='success'
                            onClick={saveEdit}
                            sx={{ mr: 1 }}
                        >
                            <CheckIcon fontSize='small' />
                        </IconButton>

                        <TextField
                            // eslint-disable-next-line jsx-a11y/no-autofocus
                            autoFocus
                            ref={inputRef}
                            id='link-input'
                            size='small'
                            margin='none'
                            value={linkUrl}
                            onChange={(event) => setLinkUrl(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    saveEdit();
                                } else if (event.key === 'Escape') {
                                    event.preventDefault();
                                    cancelEdit();
                                }
                            }}
                            sx={{ fontSize: '0.9rem' }}
                        />
                    </Box>
                ) : (
                    <Box id='link-input' display='flex' alignItems='center'>
                        <Tooltip arrow title={t('Visit Link')}>
                            <Typography
                                component='a'
                                href={linkUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                color='primary.main'
                                display='flex'
                                alignItems='center'
                                sx={{ textDecoration: 'none' }}
                            >
                                <LinkIcon color='primary' sx={{ pr: 0.5 }} />

                                {linkUrl}
                            </Typography>
                        </Tooltip>

                        {editable && (
                            <Tooltip arrow title={t('Edit Link')}>
                                <IconButton
                                    size='small'
                                    tabIndex={0}
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() => {
                                        setEditMode(true);
                                    }}
                                    sx={{ ml: 1 }}
                                >
                                    <EditIcon fontSize='small' />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                )}
            </Paper>
        </Popper>
    );
};

export default FloatingLinkEditor;
