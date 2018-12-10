import "./App.css";
import logo from "./lego_logo.svg";

import LegoBoost from "lego-boost-browser";
import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import BoostInfo from "./BoostInfo";
import BoostControlInfo from "./BoostControlInfo";
import BoostMain from "./BoostMain";
import MainMenu from "./MainMenu";
import ManualControl from "./ManualControl";
import { IDeviceInfo } from './Models';


class App extends React.Component<{}, IDeviceInfo> {
  boost = new LegoBoost();
  stateUpdaterId: NodeJS.Timeout;
  stateUpdateInterval = 200;

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      distance: 0,
      color: '',
      error: '',
      rssi: 0,
      ports: {
        A: { action: '', angle: 0 },
        B: { action: '', angle: 0 },
        AB: { action: '', angle: 0 },
        C: { action: '', angle: 0 },
        D: { action: '', angle: 0 },
        LED: { action: '', angle: 0 },
      },
      controlData: { ...this.boost.controlData }
    };
  }

  componentDidMount() {
    this.stateUpdaterId = setInterval(() => {
      // TODO: Deep copy for certain parts
      this.setState({
        connected: false, //this.boost.deviceInfo.connected,
        distance: this.boost.deviceInfo.distance,
        color: 'pink', //this.boost.deviceInfo.color,
        error: this.boost.deviceInfo.error,
        rssi: this.boost.deviceInfo.rssi,
        ports: {
          A: { action: this.boost.deviceInfo.ports.A.action, angle: this.boost.deviceInfo.ports.A.angle },
          B: { action: this.boost.deviceInfo.ports.B.action, angle: this.boost.deviceInfo.ports.B.angle },
          AB: { action: this.boost.deviceInfo.ports.AB.action, angle: this.boost.deviceInfo.ports.AB.angle },
          C: { action: this.boost.deviceInfo.ports.C.action, angle: this.boost.deviceInfo.ports.C.angle },
          D: { action: this.boost.deviceInfo.ports.D.action, angle: this.boost.deviceInfo.ports.D.angle },
          LED: { action: this.boost.deviceInfo.ports.LED.action, angle: this.boost.deviceInfo.ports.LED.angle }
        },
        controlData: { 
          speed: this.boost.controlData.speed,
          turnAngle: this.boost.controlData.turnAngle,
          input: this.boost.controlData.input,
          forceState: this.boost.controlData.forceState,
          updateInputMode: this.boost.controlData.updateInputMode,
        }
      });
    }, this.stateUpdateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.stateUpdaterId);
}

  public render() {
    const specsProps = { ...this.state };
    const controlProps = { ...this.state.controlData };
    const newProps = { boost: this.boost };

    const CreateBoostMain = () => <BoostMain {...newProps} />;
    const CreateManualControl = () => <ManualControl {...newProps} />;

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
            <BoostControlInfo {...controlProps} />
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
