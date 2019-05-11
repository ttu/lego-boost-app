import './App.css';

import LegoBoost from 'lego-boost-browser';
import { DEFAULT_CONFIG } from 'lego-boost-browser/dist/hub/hubAsync';
import * as React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import localStorage from 'local-storage';
import preval from 'preval.macro';

import BoostDeviceInfo from './components/BoostDeviceInfo';
import BoostMain from './components/BoostMain';
import ManualControl from './components/ManualControl';
import AiControl from './components/AiControl';
import CodeControl from './components/CodeControl';
import Info from './components/Info';
import MotorControl from './components/MotorControl';
import BoostConfiguration from './components/BoostConfiguration';
import { IBoostConfig } from './Models';
import SideBarMenu from './SideBarMenu';

const APP_BUILD_TIME = preval`module.exports = new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });`;
const APP_VERSION = process.env.REACT_APP_VERSION || 'not defined';
const CONFIG_STORAGE_KEY = 'boost-configuration';
const LOCAL_STATE_STORAGE_KEY = 'local-state';

const DEFAULT_BOOST_CONFIG: IBoostConfig = { driveFinetune: 1.0, turnFinetune: 1.0, leftMotor: 'A', rightMotor: 'B' };
const DEFAULT_LOCAL_STATE = { infosVisible: true, boostInfosVisible: true, extraControlsVisible: true, code: '' };

interface IApplicationState {
  infosVisible: boolean;
  extraControlsVisible: boolean;
  boostInfosVisible: boolean;
  code: string;
  configuration: IBoostConfig;
  isConnected: boolean;
}

class App extends React.Component<{}, IApplicationState> {
  boost = new LegoBoost();

  constructor(props) {
    super(props);
    const savedState = localStorage.get(LOCAL_STATE_STORAGE_KEY);
    this.state = {
      infosVisible: savedState ? savedState.infosVisible : DEFAULT_LOCAL_STATE.infosVisible,
      boostInfosVisible: savedState ? savedState.boostInfosVisible : DEFAULT_LOCAL_STATE.boostInfosVisible,
      extraControlsVisible: savedState ? savedState.extraControlsVisible : DEFAULT_LOCAL_STATE.extraControlsVisible,
      code: savedState ? savedState.code : DEFAULT_LOCAL_STATE.code,
      configuration: localStorage.get(CONFIG_STORAGE_KEY) || DEFAULT_BOOST_CONFIG,
      isConnected: false,
    };
  }

  onInfoToggle = () => {
    const newLocalState = { ...this.state, infosVisible: !this.state.infosVisible };
    localStorage.set(LOCAL_STATE_STORAGE_KEY, newLocalState);
    this.setState({ infosVisible: newLocalState.infosVisible });
  };

  onBoostInfoToggle = () => {
    const newLocalState = { ...this.state, boostInfosVisible: !this.state.boostInfosVisible };
    localStorage.set(LOCAL_STATE_STORAGE_KEY, newLocalState);
    this.setState({ boostInfosVisible: newLocalState.boostInfosVisible });
  };

  onExtraControlsToggle = () => {
    const newLocalState = { ...this.state, extraControlsVisible: !this.state.extraControlsVisible };
    localStorage.set(LOCAL_STATE_STORAGE_KEY, newLocalState);
    this.setState({ extraControlsVisible: newLocalState.extraControlsVisible });
  };

  updateCode = (code: string) => {
    const newLocalState = { ...this.state, code };
    localStorage.set(LOCAL_STATE_STORAGE_KEY, newLocalState);
    this.setState({ code });
  };

  saveCodeToStorage = (code: string) => {
    const newLocalState = { ...this.state, code };
    localStorage.set(LOCAL_STATE_STORAGE_KEY, newLocalState);
  };

  updateConfig = (c: IBoostConfig) => {
    this.setState(prevState => {
      const prevConfig = prevState.configuration;
      const newConfig = {
        distanceModifier: prevConfig.driveFinetune
          ? DEFAULT_CONFIG.METRIC_MODIFIER * prevConfig.driveFinetune
          : DEFAULT_CONFIG.METRIC_MODIFIER,
        turnModifier: prevConfig.turnFinetune
          ? DEFAULT_CONFIG.TURN_MODIFIER * prevConfig.turnFinetune
          : DEFAULT_CONFIG.TURN_MODIFIER,
        ...prevConfig,
        ...c,
      };
      localStorage.set(CONFIG_STORAGE_KEY, newConfig);
      this.boost.updateConfiguration(newConfig);
      return { configuration: newConfig };
    });
  };

  updateIsConnected = (isConnected: boolean) => this.setState({ isConnected });

  connect = () => (!this.state.isConnected ? this.boost.connect(this.state.configuration) : {});

  resetConfig = () => {
    localStorage.set(CONFIG_STORAGE_KEY, DEFAULT_BOOST_CONFIG);
    this.boost.updateConfiguration(DEFAULT_BOOST_CONFIG);
    this.setState({ configuration: DEFAULT_BOOST_CONFIG });
  };

  public render() {
    const boostProps = { boost: this.boost };

    const CreateBoostMain = () => (
      <BoostMain
        {...boostProps}
        infoVisible={this.state.infosVisible}
        infoToggle={this.onInfoToggle}
        configuration={this.state.configuration}
      />
    );
    const CreateManualControl = () => (
      <ManualControl
        {...boostProps}
        extraControlsVisible={this.state.extraControlsVisible}
        onExtraControlsToggle={this.onExtraControlsToggle}
      />
    );
    const CreateAiControl = () => (
      <AiControl {...boostProps} infoVisible={this.state.infosVisible} infoToggle={this.onInfoToggle} />
    );
    const CreateConfigurationControl = () => (
      <BoostConfiguration
        {...boostProps}
        infoVisible={this.state.infosVisible}
        infoToggle={this.onInfoToggle}
        updataConfig={this.updateConfig}
        resetConfig={this.resetConfig}
        configuration={this.state.configuration}
      />
    );
    const CreateMotorControl = () => (
      <MotorControl {...boostProps} infoVisible={this.state.infosVisible} infoToggle={this.onInfoToggle} />
    );
    const CreateCodeControl = () => (
      <CodeControl
        {...boostProps}
        code={this.state.code}
        updateCode={this.updateCode}
        saveCodeToStorage={this.saveCodeToStorage}
        infoVisible={this.state.infosVisible}
        infoToggle={this.onInfoToggle}
      />
    );
    const CreateInfoComponent = () => <Info version={APP_VERSION} date={APP_BUILD_TIME} />;

    return (
      <BrowserRouter>
        <SideBarMenu connected={this.state.isConnected} connect={this.connect}>
          <Grid centered>
            <Grid.Row>
              <Switch>
                <Route exact path="/" component={CreateBoostMain} />
                <Route path="/manual" component={CreateManualControl} />
                <Route path="/motors" component={CreateMotorControl} />
                <Route path="/ai" component={CreateAiControl} />
                <Route path="/code" component={CreateCodeControl} />
                <Route path="/config" component={CreateConfigurationControl} />
                <Route path="/info" component={CreateInfoComponent} />
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            </Grid.Row>
            <Grid.Row>
              <BoostDeviceInfo
                {...boostProps}
                connectedChanged={this.updateIsConnected}
                boostInfosVisible={this.state.boostInfosVisible}
                toggleVisibility={this.onBoostInfoToggle}
              />
            </Grid.Row>
          </Grid>
        </SideBarMenu>
      </BrowserRouter>
    );
  }
}

export default App;
