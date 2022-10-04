import type { RangeSelection, TextNode, ElementNode } from 'lexical';
import { $isAtNodeEnd } from '@lexical/selection';

export const LOW_PRIORITY = 1;

export const getSelectedNode = (selection: RangeSelection): TextNode | ElementNode => {
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();

    if (anchorNode === focusNode) {
        return anchorNode;
    }

    if (selection.isBackward()) {
        return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
        return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
    }
};
