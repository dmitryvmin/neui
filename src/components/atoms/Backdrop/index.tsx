import React, {Component} from 'react';
import styles from './index.module.scss';
import { findDOMNode } from 'react-dom';
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

const callAll = (...fns: (Function | undefined)[]) => (...args: any[]) =>
  fns.forEach(fn => fn && fn(...args));


class HiddenComponent extends React.Component<any, any> {
    state = {
      visible: this.props.visible,
      transitioning: this.props.transitioning
    };
  
    componentDidMount() {
      const { hideOnEsc, hideOnClickOutside } = this.props;
  
      if (hideOnEsc) {
        document.body.addEventListener("keydown", this.handleKeyDown);
      }
  
      if (hideOnClickOutside) {
        document.body.addEventListener("click", this.handleClickOutside);
      }
    }
  
    applyState = () => {
      const { visible, unmount } = this.props;
  
      if (typeof window !== "undefined" && unmount) {
        if (visible) {
          this.setState({ transitioning: true });
          requestAnimationFrame(() =>
            // it may be still transitioning, but it doesn't matter
            // we just need to set it to false in another loop
            this.setState({ transitioning: false, visible: true })
          );
        } else {
          this.setState({ visible: false, transitioning: true });
        }
      } else {
        this.setState({ visible });
      }
    };
  
    componentDidUpdate(prevProps: any) {
      if (prevProps.visible !== this.props.visible) {
        this.applyState();
      }
    }
  
    componentWillUnmount() {
      document.body.removeEventListener("keydown", this.handleKeyDown);
      document.body.removeEventListener("click", this.handleClickOutside);
    }
  
    handleTransitionEnd = () => {
      const { visible, unmount } = this.props;
      if (unmount && !visible) {
        // at this point, this is the last state left to return null on render
        this.setState({ transitioning: false });
      }
    };
  
    handleKeyDown = (e: KeyboardEvent) => {
      const { visible, hide } = this.props;
      if (e.key === "Escape" && visible && hide) {
        hide();
      }
    };
  
    handleClickOutside = (e: MouseEvent) => {
      const node = findDOMNode(this);
      const { hide, visible } = this.props;
      const shouldHide =
        node instanceof Element &&
        !node.contains((e as any).target) &&
        visible &&
        hide;
  
      if (shouldHide) {
        // it's possible that the outside click was on a toggle button
        // in that case, we should "wait" before hiding it
        // otherwise it could hide before and then toggle, showing it again
        setTimeout(() => this.props.visible && hide && hide());
      }
    };
  
    render() {
      const { unmount, onTransitionEnd } = this.props;
      const { visible, transitioning } = this.state;
      
      if (unmount && !visible && !transitioning) {
        return null;
      }
  
      return (
        <div
          className={styles.backdrop}
          aria-hidden={!visible}
          hidden={!visible}
          onClick={this.props.hide}
        //   {...this.props}
        //   {...this.state}
          onTransitionEnd={callAll(this.handleTransitionEnd, onTransitionEnd)}
        />
      );
    }
  }

class Comp extends React.Component<any, any> {

    click = () => {
 
        this.props.hide();
    }

    render() {

        // debugger; 

        return (
            <div className={styles.backdrop} ref={this.props.ref} onClick={this.click}>



            </div>
        )
    }

}

const Backdrop = (React.forwardRef((props, ref) => {
    // debugger; 
    return (
        <HiddenComponent {...props} elementRef={ref}/>
    )
}))

export default Backdrop;
// export default use(Backdrop, 'div');
