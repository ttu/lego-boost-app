import LegoBoost from "lego-boost-browser";
import * as React from "react";
import { Container, Grid, Image, Button } from "semantic-ui-react";

import BoostControlInfo from "./BoostControlInfo";

import ControlStop from "../images/stop-circle.svg";
import ControlDown from "../images/triangle-down.svg";
import ControlLeft from "../images/triangle-left.svg";
import ControlRight from "../images/triangle-right.svg";
import ControlUp from "../images/triangle-up.svg";

interface IProps {
  boost: LegoBoost;
}

interface IManualState {
  lastCommand: string;
}

class ManualControl extends React.Component<IProps, IManualState> {
  constructor(props) {
    super(props);
    this.state = {
      lastCommand: ''
    };
  }

  controlClick = async command => {
    this.setState({ lastCommand: command });

    switch (command) {
      case 'stop':
        await this.props.boost.stop();
        break;
      case 'left':
        await this.props.boost.turn(-90);
        break;
      case 'right':
        await this.props.boost.turn(90);
        break;
      case 'up':
        await this.props.boost.driveToDirection();
        break;
      case 'down':
        await this.props.boost.driveToDirection(0);
        break;
    }
  };

  render() {
    const controlProps = { ...this.props };

    return (
      <Container>
        <Grid columns={3} celled padded style={{ height: "90vh" }}>
          <Grid.Row style={{ height: "33%" }}>
            <Grid.Column />
            <Grid.Column verticalAlign="middle" onClick={() => this.controlClick("up")}>
              <Image src={ControlUp} style={{ width: "100%" }} />
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
          <Grid.Row style={{ height: "33%" }}>
            <Grid.Column verticalAlign="middle" onClick={() => this.controlClick("left")}>
              <Image src={ControlLeft} style={{ width: "100%" }} />
            </Grid.Column>
            <Grid.Column verticalAlign="middle" onClick={() => this.controlClick("stop")}>
              <Image src={ControlStop} style={{ width: "100%" }} />
            </Grid.Column>
            <Grid.Column verticalAlign="middle" onClick={() => this.controlClick("right")}>
              <Image src={ControlRight} style={{ width: "100%" }} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ height: "33%" }}>
            <Grid.Column />
            <Grid.Column verticalAlign="middle" onClick={() => this.controlClick("down")}>
              <Image circular src={ControlDown} />
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
          </Grid>

          <Grid>
          {/* <Grid.Row columns={1}>
            <Grid.Column>Last command: {this.state.lastCommand}</Grid.Column>
          </Grid.Row> */}
          <Grid.Row columns={1}>
            <Grid.Column>
              <Button secondary onClick={this.props.boost.changeLed.bind(this.props.boost)}>
                Change led color
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <BoostControlInfo {...controlProps} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default ManualControl;
