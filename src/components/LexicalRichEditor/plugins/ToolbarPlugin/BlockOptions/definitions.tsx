import type { FC } from 'react';
import type { LexicalEditor } from 'lexical';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CodeIcon from '@mui/icons-material/Code';
import ListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ParagraphIcon from '@mui/icons-material/Notes';
import QuoteIcon from '@mui/icons-material/FormatQuote';

import { fa1 } from '@fortawesome/free-solid-svg-icons/fa1';
import { fa2 } from '@fortawesome/free-solid-svg-icons/fa2';
import { fa3 } from '@fortawesome/free-solid-svg-icons/fa3';
import { fa4 } from '@fortawesome/free-solid-svg-icons/fa4';
import { fa5 } from '@fortawesome/free-solid-svg-icons/fa5';
import { faHeading } from '@fortawesome/free-solid-svg-icons/faHeading';

export type BlockType =
    | 'code'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'ol'
    | 'paragraph'
    | 'quote'
    | 'ul';

export const SUPPORTED_BLOCK_TYPES = new Set<BlockType>([
    'paragraph',
    'h1',
    'h2',
    'ul',
    'ol',
    'quote',
    'code'
]);

export const BLOCK_TYPE_NAMES: Record<BlockType, string> = {
    paragraph: 'Normal',
    code: 'Code Block',
    quote: 'Quote',
    h1: 'Large Heading',
    h2: 'Small Heading',
    h3: 'Heading',
    h4: 'Heading',
    h5: 'Heading',
    ol: 'Numbered List',
    ul: 'Bulleted List'
};

export const H1Icon = () => {
    return (
        <span className='fa-layers fa-fw'>
            <FontAwesomeIcon icon={faHeading} transform='shrink-7 left-1' />
            <FontAwesomeIcon icon={fa1} transform='shrink-6 right-7' />
        </span>
    );
};

export const H2Icon = () => {
    return (
        <span className='fa-layers fa-fw'>
            <FontAwesomeIcon icon={faHeading} transform='shrink-7 left-1' />
            <FontAwesomeIcon icon={fa2} transform='shrink-6 right-7' />
        </span>
    );
};

const H3Icon = () => {
    return (
        <span className='fa-layers fa-fw'>
            <FontAwesomeIcon icon={faHeading} transform='shrink-7 left-1' />
            <FontAwesomeIcon icon={fa3} transform='shrink-6 right-7' />
        </span>
    );
};

const H4Icon = () => {
    return (
        <span className='fa-layers fa-fw'>
            <FontAwesomeIcon icon={faHeading} transform='shrink-7 left-1' />
            <FontAwesomeIcon icon={fa4} transform='shrink-6 right-7' />
        </span>
    );
};

const H5Icon = () => {
    return (
        <span className='fa-layers fa-fw'>
            <FontAwesomeIcon icon={faHeading} transform='shrink-7 left-1' />
            <FontAwesomeIcon icon={fa5} transform='shrink-6 right-7' />
        </span>
    );
};

export const BLOCK_TYPE_ICONS: Record<BlockType, FC> = {
    paragraph: ParagraphIcon,
    code: CodeIcon,
    quote: QuoteIcon,
    h1: H1Icon,
    h2: H2Icon,
    h3: H3Icon,
    h4: H4Icon,
    h5: H5Icon,
    ol: ListNumberedIcon,
    ul: ListBulletedIcon
};

export interface ItemProps {
    blockType: BlockType;
    editor: LexicalEditor;
    onCloseMenu: () => void;
}
