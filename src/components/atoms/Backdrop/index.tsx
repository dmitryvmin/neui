import React, {Component} from 'react';
import styles from './index.module.scss';
// import CSSProps from "./../../../styles/utils/CSSProps";
// import isPropValid from "@emotion/is-prop-valid";
// import use from "reuse";

// function applyAllRefs<T = any>(...refs: Array<React.Ref<T> | undefined>) {
//     const validRefs = refs.filter(Boolean);
//     if (!validRefs.length) return undefined;
//     return (element: T) => {
//       for (const value of validRefs) {
//         if (typeof value === "object") {
//           // @ts-ignore
//           value.current = element;
//         } else if (typeof value === "function") {
//           value(element);
//         }
//       }
//     };
//   }

//   function pickCSSProps<P extends object>(props: P) {
//     let filteredProps: Partial<P> | undefined;
  
//     for (const prop in props) {
//       if (prop in CSSProps) {
//         if (!filteredProps) {
//           filteredProps = {};
//         }
//         filteredProps[prop] = props[prop];
//       }
//     }
  
//     return filteredProps;
//   }

//   function pickHTMLProps<P extends object>(props: P) {
//     const filteredProps: Partial<P> = {};
  
//     for (const prop in props) {
//       if (isPropValid(prop)) {
//         filteredProps[prop] = props[prop];
//       }
//     }
  
//     return filteredProps;
//   }

//   const dedupeClassName = (className?: string) =>
//   className &&
//   className
//     .split(" ")
//     .filter((part, i, parts) => i === parts.indexOf(part))
//     .join(" ");

// const BoxComponent = React.forwardRef<HTMLElement, any>(
//     ({ use: T, ...props }, ref) => {
//       if (!T) return null;
  
//       const style = pickCSSProps(props);
  
//       if (typeof T === "string") {
         
//         const className = dedupeClassName(props.className);
//         const allProps = Object.assign(
//           pickHTMLProps(props),
//           { className },
//           style ? { style } : {}
//         );
//         return React.createElement(T, {
//           ...allProps,
//           ref: applyAllRefs(ref, props.elementRef)
//         });
//       }
//       return React.createElement(T, {
//         ...props,
//         ref: applyAllRefs(ref, props.elementRef),
//         style
//       });
//     }
//   );

const Backdrop = (React.forwardRef((props, ref) => {
    // debugger; 
    return (
    // @ts-ignore
    <div className={styles.backdrop} {...props} >

    </div>
    )
}))

export default Backdrop;
// export default use(Backdrop, 'div');
