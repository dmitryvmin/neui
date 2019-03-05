import * as React from "react";
import { Container, ComposableContainer, ActionMap } from "constate";
import { UseComponent } from "reuse";
import ReactDOM, { findDOMNode } from 'react-dom';
import styles from './index.module.scss';

export interface HiddenContainerState {
  visible: boolean;
}

export interface HiddenContainerActions {
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

const initialState: HiddenContainerState = { visible: false };

const actions: ActionMap<HiddenContainerState, HiddenContainerActions> = {
  show: () => () => ({ visible: true }),
  hide: () => () => ({ visible: false }),
  toggle: () => (state: any) => ({
    visible: !state.visible
  })
};

const HiddenContainer: ComposableContainer<
  HiddenContainerState,
  HiddenContainerActions
> = (props: any) => (

  <Container
    {...props}
    initialState={{ ...initialState, ...props.initialState }}
    actions={actions}
  />

);

Object.assign(HiddenContainer, {
  initialState,
  actions
});

interface Props {
  elementRef?: React.Ref<any>;
}

function hoist<P extends Props>(
  Comp: React.ComponentType<P>,
  Base: UseComponent<any>
) {
  const Component = (React.forwardRef((props, ref) => (
    // @ts-ignore
    <Comp {...props} elementRef={ref} />
  )) as unknown) as UseComponent<typeof Comp>;
  Component.uses = Base.uses;
  return Component;
}

const Overlay: React.FC<any> = (props): React.ReactElement<any> => (
    <div className="overlay">{props.children}</div>
)

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
        aria-hidden={!visible}
        hidden={!visible}
        {...this.props}
        {...this.state}
        className={styles.overlay}
        onTransitionEnd={callAll(this.handleTransitionEnd, onTransitionEnd)}
      />
    );
  }
}

type Function = (...args: any[]) => void;

const callAll = (...fns: (Function | undefined)[]) => (...args: any[]) =>
  fns.forEach(fn => fn && fn(...args));

const HiddenHideComponent = ({ onClick, ...props }: any) => (
  <HiddenContainer onClick={callAll(props.hide, onClick)} {...props} />
);

const HiddenHide = (React.forwardRef((props, ref) => (
    // @ts-ignore
    <HiddenHideComponent {...props} elementRef={ref} />
  )))

export default Object.assign(Overlay, {
    Container: HiddenContainer,
    Hide: HiddenComponent,
  });