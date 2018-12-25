import "./App.css";
// import logo from "./lego_logo.svg";

import LegoBoost from "lego-boost-browser";
import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container, Accordion, Grid } from "semantic-ui-react";

import BoostDeviceInfo from "./components/BoostDeviceInfo";
import BoostMain from "./components/BoostMain";
import MainMenu from "./MainMenu";
import ManualControl from "./components/ManualControl";
import AiControl from "./components/AiControl";
import CodeControl from "./components/CodeControl";
import About from "./components/About";

const APP_BUILD_TIME = process.env.REACT_APP_BUILD_TIME || "not defined";
const APP_VERSION = process.env.REACT_APP_VERSION || "not defined";

class App extends React.Component<{}> {
  boost = new LegoBoost();

  constructor(props) {
    super(props);
  }

  public render() {
    const boostProps = { boost: this.boost };

    const CreateBoostMain = () => <BoostMain {...boostProps} />;
    const CreateManualControl = () => <ManualControl {...boostProps} />;
    const CreateAiControl = () => <AiControl {...boostProps} />;
    const CreateCodeControl = () => <CodeControl {...boostProps} />;
    const CreateAboutComponent = () => (
      <About version={APP_VERSION} date={APP_BUILD_TIME} />
    );

    return (
      <BrowserRouter>
        <Container>
          <MainMenu />
          <Grid centered>
            <Grid.Row>
              <Route exact path="/" component={CreateBoostMain} />
              <Route path="/manual" component={CreateManualControl} />
              <Route path="/ai" component={CreateAiControl} />
              <Route path="/code" component={CreateCodeControl} />
              <Route path="/about" component={CreateAboutComponent} />
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
