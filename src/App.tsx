import './App.css';
import logo from './lego_logo.svg';

import LegoBoost from 'lego-boost-browser';
import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import BoostInfo from './BoostInfo';
import BoostMain from './BoostMain';
import MainMenu from './MainMenu'
import ManualControl from './ManualControl';

interface IState {
  boost: LegoBoost,
  distance: number
  ledColor: string
}

class App extends React.Component<{}, IState> {

  constructor(props) {
    super(props);
    this.state = {
      boost: new LegoBoost(),
      distance: 0,
      ledColor: ''
    };
  }

  componentDidMount() {
    this.setState({
      distance: this.state.boost.deviceInfo.distance,
      ledColor: this.state.boost.color
    });
  };

  public render() {

    // const newProps = { ...this.props, ...this.state };
    const specsProps = { ...this.state };
    const newProps = { boost: this.state.boost };

    const CreateBoostMain = () => (<BoostMain  {...newProps} />);
    const CreateManualControl = () => (<ManualControl  {...newProps} />);

    return (
      <div className="App">
        <BrowserRouter>
          <Container>
            {/* <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Boost</h1>
            </header> */}
            <MainMenu />
            <BoostInfo {...specsProps} />
            <div className="content">
              <Route exact path="/" component={CreateBoostMain} />
              <Route path="/manual" component={CreateManualControl} />
            </div>
          </Container>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
