import './App.css';

import LegoBoost from 'lego-boost-browser';
import { DEFAULT_CONFIG } from 'lego-boost-browser/dist/hub/hubAsync';
import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';
import localStorage from 'local-storage'

import BoostDeviceInfo from './components/BoostDeviceInfo';
import BoostMain from './components/BoostMain';
import MainMenu from './MainMenu';
import ManualControl from './components/ManualControl';
import AiControl from './components/AiControl';
import CodeControl from './components/CodeControl';
import Info from './components/Info';
import MotorControl from './components/MotorControl';
import BoostConfiguration from './components/BoostConfiguration';
import { IBoostConfig } from './Models';

const APP_BUILD_TIME = process.env.REACT_APP_BUILD_TIME || 'not defined';
const APP_VERSION = process.env.REACT_APP_VERSION || 'not defined';
const CONFIG_STORAGE_KEY = 'boost-configuration';

const DEFAULT_BOOST_CONFIG: IBoostConfig = { driveFinetune: 1.0, turnFinetune: 1.0, leftMotor: 'A', rightMotor: 'B' };

interface IApplicationState {
  aiInfoVisible: boolean;
  mainInfoVisible: boolean;
  codeInfoVisible: boolean;
  configInfoVisible: boolean;
  motorInfoVisible: boolean;
  code: string;
  configuration: IBoostConfig;
} 

class App extends React.Component<{}, IApplicationState> {
  boost = new LegoBoost();

  constructor(props) {
    super(props);
    this.state = { 
      aiInfoVisible: true,
      mainInfoVisible: true,
      codeInfoVisible: true,
      configInfoVisible: true,
      motorInfoVisible: true,
      code: '',
      configuration: localStorage.get(CONFIG_STORAGE_KEY) || DEFAULT_BOOST_CONFIG
    }
  }

  onInfoClose = (propName: string) => {
    // @ts-ignore
    this.setState({ [propName]: false });
  }

  updateCode = (code: string) => {
    this.setState({ code });
  }

  updateConfig = (c: IBoostConfig) => {
    this.setState((prevState) => {
      const prevConfig = prevState.configuration;
      const newConfig = {
        distanceModifier: prevConfig.driveFinetune ? DEFAULT_CONFIG.METRIC_MODIFIER * prevConfig.driveFinetune : DEFAULT_CONFIG.METRIC_MODIFIER,
        turnModifier: prevConfig.turnFinetune ? DEFAULT_CONFIG.TURN_MODIFIER * prevConfig.turnFinetune : DEFAULT_CONFIG.TURN_MODIFIER,
        ...prevConfig,
        ...c
      };
      localStorage.set(CONFIG_STORAGE_KEY, newConfig);
      this.boost.updateConfiguration(newConfig);
      return { configuration: newConfig };
    });
  }

  resetConfig = () => {
    localStorage.set(CONFIG_STORAGE_KEY, DEFAULT_BOOST_CONFIG);
    this.boost.updateConfiguration(DEFAULT_BOOST_CONFIG);
    this.setState({ configuration: DEFAULT_BOOST_CONFIG });
  }

  public render() {
    const boostProps = { boost: this.boost };

    const CreateBoostMain = () => <BoostMain {...boostProps} infoVisible={this.state.mainInfoVisible} onInfoClose={this.onInfoClose.bind(this, 'mainInfoVisible')} configuration={this.state.configuration} />;
    const CreateManualControl = () => <ManualControl {...boostProps} />;
    const CreateAiControl = () => <AiControl {...boostProps} infoVisible={this.state.aiInfoVisible} onInfoClose={this.onInfoClose.bind(this, 'aiInfoVisible')} />;
    const CreateConfigurationControl = () => <BoostConfiguration {...boostProps} infoVisible={this.state.configInfoVisible} onInfoClose={this.onInfoClose.bind(this, 'configInfoVisible')} updataConfig={this.updateConfig} resetConfig={this.resetConfig} configuration={this.state.configuration} />;
    const CreateMotorControl = () => <MotorControl {...boostProps} infoVisible={this.state.motorInfoVisible} onInfoClose={this.onInfoClose.bind(this, 'motorInfoVisible')} />;
    const CreateCodeControl = () => <CodeControl {...boostProps} code={this.state.code} updateCode={this.updateCode} infoVisible={this.state.codeInfoVisible} onInfoClose={this.onInfoClose.bind(this, 'codeInfoVisible')} />;
    const CreateInfoComponent = () => <Info version={APP_VERSION} date={APP_BUILD_TIME} />;

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
              <Route path="/config" component={CreateConfigurationControl} />
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
