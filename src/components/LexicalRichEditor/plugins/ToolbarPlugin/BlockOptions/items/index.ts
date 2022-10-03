import type { FC } from 'react';

import type { BlockType, ItemProps } from '../definitions';

import Paragraph from './ParagraphItem';
import LargeHeading from './Heading1Item';
import SmallHeading from './Heading2Item';
import BulletList from './BulletListItem';
import NumberedList from './NumberedListItem';
import Quote from './QuoteItem';
import Code from './CodeItem';

const items: Record<BlockType, FC<ItemProps>> = {
    paragraph: Paragraph,
    h1: LargeHeading,
    h2: SmallHeading,
    h3: null,
    h4: null,
    h5: null,
    ul: BulletList,
    ol: NumberedList,
    quote: Quote,
    code: Code
};

export default items;
