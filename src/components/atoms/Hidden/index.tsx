import * as React from "react";
import { findDOMNode } from "react-dom";

class HiddenComponent extends React.Component<any, any> {
    state = {
      visible: this.props.visible,
      transitioning: this.props.transitioning
    };
  
    componentDidMount() {
      const { 
          hideOnEsc, 
          hideOnClickOutside 
        } = this.props;
  
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
          aria-hidden={!visible}
          hidden={!visible}
          {...this.props}
          {...this.state}
        />
      );
    }
  }