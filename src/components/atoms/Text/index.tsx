import React, { ReactNode } from 'react';
import styled from 'styled-components';

import styles from './index.module.scss';

/**
 * Utils
 */
// TODO: if we want to offer a way to select H's with styled-components
// const withDynamicTag = Component => {
//     const bucket = Object.create(null);
//     const DynamicTag = props => {
//         const { tag } = props;
//         if (typeof tag !== 'string' || !styled.hasOwnProperty(tag)) return createElement(Component, props);
//         if (bucket[tag] === undefined) bucket[tag] = Component.withComponent(tag);
//         return createElement(bucket[tag], props);
//     };
//     const name = Component.displayName || Component.constructor.name;
//     if (name) DynamicTag.displayName = `DynamicTag(${name})`;
//     return DynamicTag;
// };

/**
 * Constants
 */
const HEADING: string = 'heading';
const PARAGRAPH: string = 'paragraph';
const SUBTITLE: string = 'subtitle';

/**
 * TypeScript
 */
// TODO: what props will a text element have...
// https://polaris.shopify.com/components/titles-and-text/text-style
interface HeadingProps {
    fontSize: number;
    props: any;
}
type TextTypes = 'heading' | 'paragraph' | 'subtitle' | undefined;
type TextEls = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
interface IText {
    type?: TextTypes;
    children: React.ReactNode;
}

/**
 * Gets the appropriate styled-component (or className)
 */
const componentClass: string = 'neui-Text' ;
function getClassWrap(type: TextTypes, children: React.ReactNode): any {
    switch (type) {
        case HEADING:
            return () => <h1 className={`${componentClass}-${HEADING}`}>{children}</h1>;
        case PARAGRAPH:
            return () => <p className={styles[`${componentClass}-${PARAGRAPH}`]}>{children}</p>
        case SUBTITLE:
            return () => <p className={`${componentClass}-${SUBTITLE}`}>{children}</p>;
        default:
            return () => <p className={`${componentClass}-${PARAGRAPH}`}>{children}</p>;
    }
}

function getStyledWrap(type: TextTypes) {
    return styled.p`
        font-size: 2em;
        font-weight: 700;          
    `;
}

function getTextEl(type: TextTypes): TextEls {
    switch (type) {
        case HEADING:
            return 'h1';
        case PARAGRAPH:
            return 'p';
        case SUBTITLE:
            return 'p';
        default:
            return 'p';
    }
}

/**
 * Component
 */
const TextComponent: React.FunctionComponent<IText> = (props: IText) => {
    const textEl = getTextEl(props.type);
    // const Wrapper = getStyledWrap(props.type);
    const Wrapper: any = getClassWrap(props.type, props.children);

    console.warn('@@', styles);

    return (
        <Wrapper>
            {/*<Wrapper {...props} as={textEl}>*/}
            {props.children}
        </Wrapper>
    )
}


export default TextComponent;
