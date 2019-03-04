import React, { ReactNode } from 'react';
import use from "reuse";
import styles from './index.module.scss';

/**
 * Constants
 */
const HEADING: string = 'heading';
const PARAGRAPH: string = 'paragraph';
const SUBTITLE: string = 'subtitle';

// TODO: what props will a text element have...
// https://polaris.shopify.com/components/titles-and-text/text-style

type TextTypes = 'heading' | 'paragraph' | 'subtitle' | undefined;
type TextEls = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
interface IText {
    type?: TextTypes;
    children: React.ReactNode;
}

/**
 * Gets the appropriate styled-component (or className)
 */
function getClassname(type: TextTypes): any {
    switch (type) {
        case HEADING:
            return styles.heading; 
        case PARAGRAPH:
            return styles.paragraph; 
        case SUBTITLE:
            return styles.subtitle; 
        default:
            return styles.paragraph; 
    }
}


function getTextEl(type: TextTypes): any {
    switch (type) {
        case HEADING:
            return use('h1');
        case PARAGRAPH:
            return use('p');
        case SUBTITLE:
            return use('p');
        default:
            return use('p');
    }
}

/**
 * Component
 */
const TextComponent: React.FunctionComponent<IText> = (props: IText) => {
    const Block = getTextEl(props.type);
    const className: any = getClassname(props.type);

    return (
        <Block className={className}>
            {props.children}
        </Block>
    )
}


export default TextComponent;
