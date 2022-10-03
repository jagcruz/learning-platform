import type { FC } from 'react';
import type { RangeSelection, NodeSelection, GridSelection, LexicalNode } from 'lexical';
import { useEffect } from 'react';
import { $getListDepth, $isListItemNode, $isListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    $getSelection,
    $isElementNode,
    $isRangeSelection,
    INDENT_CONTENT_COMMAND,
    COMMAND_PRIORITY_HIGH
} from 'lexical';

const getElementNodesInSelection = (
    selection: null | RangeSelection | NodeSelection | GridSelection
): Set<LexicalNode> => {
    if (!selection) {
        return new Set([]);
    }

    const nodesInSelection = selection.getNodes();

    if (nodesInSelection.length === 0 && $isRangeSelection(selection)) {
        return new Set([
            selection.anchor.getNode().getParentOrThrow(),
            selection.focus.getNode().getParentOrThrow()
        ]);
    }

    return new Set(
        nodesInSelection.map((n) => ($isElementNode(n) ? n : n.getParentOrThrow()))
    );
};

const isIndentPermitted = (maxDepth: number): boolean => {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
        return false;
    }

    const elementNodesInSelection = getElementNodesInSelection(selection);

    let totalDepth = 0;

    elementNodesInSelection.forEach((elementNode) => {
        if ($isListNode(elementNode)) {
            totalDepth = Math.max($getListDepth(elementNode) + 1, totalDepth);
        } else if ($isListItemNode(elementNode)) {
            const parent = elementNode.getParent();

            if (!$isListNode(parent)) {
                throw new Error(
                    'ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.'
                );
            }

            totalDepth = Math.max($getListDepth(parent) + 1, totalDepth);
        }
    });

    return totalDepth <= maxDepth;
};

interface ListMaxIndentLevelPluginProps {
    maxDepth: number;
}

const ListMaxIndentLevelPlugin: FC<ListMaxIndentLevelPluginProps> = ({ maxDepth }) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            INDENT_CONTENT_COMMAND,
            () => !isIndentPermitted(maxDepth ?? 7),
            COMMAND_PRIORITY_HIGH
        );
    }, [editor, maxDepth]);

    return null;
};

export default ListMaxIndentLevelPlugin;
