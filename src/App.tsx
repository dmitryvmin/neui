import React, { Component } from 'react';
import './App.scss';
import ReactDOM, { findDOMNode } from 'react-dom';
import invariant from 'tiny-invariant';
import { canUseDOM } from 'exenv';

import Text from './components/atoms/Text';
import Backdrop from './components/atoms/Backdrop';
import Overlay from './components/atoms/Overlay';

const createContainer = (zIndex: number) => {
    const container = document.createElement('div');
    container.setAttribute('class', 'neui-portal');
    container.setAttribute('style', `z-index: ${zIndex};`);

    body().appendChild(container);

    return container;
  };

const body = () => {
    invariant(document && document.body, 'cannot find document.body');
    return document.body;
  };

const portalParent = () => {
    const parentElement = document.querySelector(
      'body > .atlaskit-portal-container',
    );
    if (!parentElement) {
      const parent = document.createElement('div');
      parent.setAttribute('class', 'neui-portal-container');
      parent.setAttribute('style', `display: flex;`);
      body().appendChild(parent);
      return parent;
    }
    return parentElement;
  };
  
class App extends Component {

    render() {
        return (
            <div className="App">

                <Overlay.Container>
                    {(overlay: any) => (
                        // ReactDOM.createPortal(
                        <div>
                            <Backdrop {...overlay} />
                            <button onClick={overlay.toggle}>Toggle</button>
                            <Overlay.Hide fade slide {...overlay}>Overlay</Overlay.Hide>
                        </div>
                        // , createContainer(100))
                    )}
                </Overlay.Container>

                <Text type="heading">
                    This is a heading
                </Text>
                <Text type="paragraph">
                    This is a paragraph
                </Text>
                <Text type="subtitle">
                    This is a subtitle
                </Text>

            </div>
        );
    }
}

export default App;
