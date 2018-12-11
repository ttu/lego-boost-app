import "./App.css";
// import logo from "./lego_logo.svg";

import LegoBoost from "lego-boost-browser";
import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import BoostDeviceInfo from "./components/BoostDeviceInfo";
import BoostMain from "./components/BoostMain";
import MainMenu from "./MainMenu";
import ManualControl from "./components/ManualControl";
import { IDeviceInfo } from './Models';
import AiControl from "./components/AiControl";
import CodeControl from "./components/CodeControl";


class App extends React.Component<{}> {
  boost = new LegoBoost();

  constructor(props) {
    super(props);
  }

  public render() {
    const boostProps = { boost: this.boost };

    const CreateBoostMain = () => <BoostMain {...boostProps} />;
    const CreateManualControl = () => <ManualControl {...boostProps} />;
    const CreateAiControl = () => <AiControl { ...boostProps } />;
    const CreateCodeControl = () => <CodeControl { ...boostProps } />;

    return (
      <div className="App">
        <BrowserRouter>
          <Container>
            {/* <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Boost</h1>
            </header> */}
            <MainMenu />
            <div className="content">
              <Route exact path="/" component={CreateBoostMain} />
              <Route path="/manual" component={CreateManualControl} />
              <Route path="/ai" component={CreateAiControl} />
              <Route path="/code" component={CreateCodeControl} />
            </div>
            <BoostDeviceInfo {...boostProps} />
          </Container>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
