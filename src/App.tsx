import './App.css';
// import logo from "./lego_logo.svg";

import LegoBoost from 'lego-boost-browser';
import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';

import BoostDeviceInfo from './components/BoostDeviceInfo';
import BoostMain from './components/BoostMain';
import MainMenu from './MainMenu';
import ManualControl from './components/ManualControl';
import AiControl from './components/AiControl';
import CodeControl from './components/CodeControl';
import Info from './components/Info';
import MotorControl from './components/MotorControl';

const APP_BUILD_TIME = process.env.REACT_APP_BUILD_TIME || 'not defined';
const APP_VERSION = process.env.REACT_APP_VERSION || 'not defined';


interface IApplicationState {
  aiInfoVisible: boolean;
  mainInfoVisible: boolean;
  codeInfoVisible: boolean;
  motorInfoVisible: boolean;
  code: string;
}

class App extends React.Component<{}, IApplicationState> {
  boost = new LegoBoost();

  constructor(props) {
    super(props);
    this.state = { 
      aiInfoVisible: true,
      mainInfoVisible: true,
      codeInfoVisible: true,
      motorInfoVisible: true,
      code: ''
    }
  }

  onAiInfoClose = () => {
    this.setState({ aiInfoVisible: false });
  }

  onMainInfoClose = () => {
    this.setState({ mainInfoVisible: false });
  }

  onMotorInfoClose = () => {
    this.setState({ motorInfoVisible: false });
  }

  onCodeInfoClose = () => {
    this.setState({ codeInfoVisible: false });
  }

  updateCode = (code) => {
    this.setState({ code });
  }

  public render() {
    const boostProps = { boost: this.boost };

    const CreateBoostMain = () => <BoostMain {...boostProps} infoVisible={this.state.mainInfoVisible} onInfoClose={this.onMainInfoClose} />;
    const CreateManualControl = () => <ManualControl {...boostProps} />;
    const CreateAiControl = () => <AiControl {...boostProps} infoVisible={this.state.aiInfoVisible} onInfoClose={this.onAiInfoClose} />;
    const CreateMotorControl = () => <MotorControl {...boostProps} infoVisible={this.state.aiInfoVisible} onInfoClose={this.onMotorInfoClose} />;
    const CreateCodeControl = () => <CodeControl {...boostProps} code={this.state.code} updateCode={this.updateCode} infoVisible={this.state.codeInfoVisible} onInfoClose={this.onCodeInfoClose} />;
    const CreateInfoComponent = () => (
      <Info version={APP_VERSION} date={APP_BUILD_TIME} />
    );

    return (
      <BrowserRouter>
        <Container>
          <MainMenu />
          <Grid centered>
            <Grid.Row>
              <Route exact path="/" component={CreateBoostMain} />
              <Route path="/manual" component={CreateManualControl} />
              <Route path="/motors" component={CreateMotorControl} />
              <Route path="/ai" component={CreateAiControl} />
              <Route path="/code" component={CreateCodeControl} />
              <Route path="/info" component={CreateInfoComponent} />
            </Grid.Row>
            <Grid.Row>
              <BoostDeviceInfo {...boostProps} />
            </Grid.Row>
          </Grid>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
