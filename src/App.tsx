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
import { BoostConfig, ControlMode, StoredApplicationState } from './Models';
import SideBarMenu from './SideBarMenu';
import ManualExtraControl from './components/ManualExtraControl';
import { ControlData } from 'lego-boost-browser/dist/types';

const APP_BUILD_TIME = preval`module.exports = new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });`;
const APP_VERSION = process.env.REACT_APP_VERSION || 'not defined';
const CONFIG_STORAGE_KEY = 'boost-configuration';
const LOCAL_STATE_STORAGE_KEY = 'local-state';

const DEFAULT_BOOST_CONFIG: BoostConfig = {
  driveFinetune: 1.0,
  turnFinetune: 1.0,
  leftMotor: 'A',
  rightMotor: 'B',
};

const DEFAULT_STATE: StoredApplicationState = {
  infosVisible: true,
  boostInfosVisible: true,
  extraControlsVisible: false,
  code: '',
  controlMode: ControlMode.Click,
};

interface ApplicationState {
  infosVisible: boolean;
  extraControlsVisible: boolean;
  boostInfosVisible: boolean;
  code: string;
  configuration: BoostConfig;
  isConnected: boolean;
  controlMode: ControlMode;
  controlData: ControlData;
}

class App extends React.Component<{}, ApplicationState> {
  boost: LegoBoost = new LegoBoost();
  stateUpdaterId: NodeJS.Timeout;
  stateUpdateInterval = 500;

  constructor(props) {
    super(props);
    const savedState = localStorage.get(LOCAL_STATE_STORAGE_KEY) as StoredApplicationState;
    this.state = {
      infosVisible:
        savedState && this.isBoolean(savedState.infosVisible) ? savedState.infosVisible : DEFAULT_STATE.infosVisible,
      boostInfosVisible:
        savedState && this.isBoolean(savedState.boostInfosVisible)
          ? savedState.boostInfosVisible
          : DEFAULT_STATE.boostInfosVisible,
      extraControlsVisible:
        savedState && this.isBoolean(savedState.extraControlsVisible)
          ? savedState.extraControlsVisible
          : DEFAULT_STATE.extraControlsVisible,
      code: savedState ? savedState.code : DEFAULT_STATE.code,
      controlMode: (savedState && savedState.controlMode) || DEFAULT_STATE.controlMode,
      configuration: (localStorage.get(CONFIG_STORAGE_KEY) as BoostConfig) || DEFAULT_BOOST_CONFIG,
      isConnected: false,
      controlData: this.boost.controlData,
    };

    // logDebug is a private, so must ignore ts errors
    // @ts-ignore
    // tslint:disable-next-line: no-console
    this.boost.logDebug = console.log;
  }

  isBoolean = (value: any) => typeof value === 'boolean';

  onInfoToggle = () => this.updateToStorageAndState('infosVisible', !this.state.infosVisible);

  onBoostInfoToggle = () => this.updateToStorageAndState('boostInfosVisible', !this.state.boostInfosVisible);

  onExtraControlsToggle = () => this.updateToStorageAndState('extraControlsVisible', !this.state.extraControlsVisible);

  updateCode = (code: string) => this.updateToStorageAndState('code', code);

  onUpdateControlMode = (controlMode: ControlMode) => this.updateToStorageAndState('controlMode', controlMode);

  saveCodeToStorage = (code: string) => localStorage.set(LOCAL_STATE_STORAGE_KEY, { ...this.state, code });

  updateToStorageAndState = (propName: string, value: any) => {
    const newLocalState = { ...this.state, [propName]: value };
    localStorage.set(LOCAL_STATE_STORAGE_KEY, newLocalState);
    // @ts-ignore
    this.setState({ [propName]: value });
  };

  updateConfig = (c: BoostConfig) => {
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

  componentDidMount = () => {
    // TODO: Move controlData and deviceInfo update from components to here
    this.stateUpdaterId = setInterval(() => {
      this.setState({
        controlData: this.boost.controlData,
      });
    }, this.stateUpdateInterval);
  };

  componentWillUnmount() {
    clearInterval(this.stateUpdaterId);
  }

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
    const CreateManualControl = () => <ManualControl {...boostProps} controlMode={this.state.controlMode} />;
    const CreateManualExtraControl = () => (
      <ManualExtraControl
        {...boostProps}
        controlMode={this.state.controlMode}
        onUpdateControlMode={this.onUpdateControlMode}
        extraControlsVisible={this.state.extraControlsVisible}
        onExtraControlsToggle={this.onExtraControlsToggle}
      />
    );
    const CreateAiControl = () => (
      <AiControl
        {...boostProps}
        controlData={this.state.controlData}
        infoVisible={this.state.infosVisible}
        infoToggle={this.onInfoToggle}
      />
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
            <Grid.Row className="">
              <Switch>
                <Route exact path="/" render={CreateBoostMain} />
                <Route path="/manual" render={CreateManualControl} />
                <Route path="/manualextra" render={CreateManualExtraControl} />
                <Route path="/motors" render={CreateMotorControl} />
                <Route path="/ai" render={CreateAiControl} />
                <Route path="/code" render={CreateCodeControl} />
                <Route path="/config" render={CreateConfigurationControl} />
                <Route path="/info" render={CreateInfoComponent} />
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            </Grid.Row>
            <Grid.Row className="main-row">
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
