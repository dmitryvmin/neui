import React, { Component } from 'react';
import './App.scss';

import Text from './components/atoms/Text';
import Backdrop from './components/atoms/Backdrop';
import Overlay from './components/atoms/Overlay';

class App extends Component {

    render() {
        return (
            <div className="App">

                <Overlay.Container>
                    {(overlay: any) => (
                        <div>
                            <Backdrop {...overlay} />
                            <Overlay {...overlay}>Overlay</Overlay>
                        </div>
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
