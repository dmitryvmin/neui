import React, {Component} from 'react';
import './App.scss';
import styled from 'styled-components';

import Text from './components/atoms/Text/index';


class App extends Component {

    render() {
        return (
            <div className="App">

                <StyledComponent>
                    Styled Component
                </StyledComponent>

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

const StyledComponent = styled.p`
  font-size: 2em;
  color: salmon;
  margin: 0;
`;

export default App;
