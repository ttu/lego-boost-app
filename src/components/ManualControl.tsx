import LegoBoost from "lego-boost-browser";
import * as React from "react";
import { Container, Grid, Image, Segment, GridColumn } from "semantic-ui-react";

import BoostControlInfo from "./BoostControlInfo";

import ControlStop from "../images/stop-circle.svg";
import ControlDown from "../images/triangle-down.svg";
import ControlLeft from "../images/triangle-left.svg";
import ControlRight from "../images/triangle-right.svg";
import ControlUp from "../images/triangle-up.svg";

interface IProps {
  boost: LegoBoost;
}

class ManualControl extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  controlClick = async command => {
    console.log(command);
    switch (command) {
      case 'stop':
        await this.props.boost.stop();
        break;
      case 'left':
        await this.props.boost.turnUntil(0);
        break;
      case 'right':
        await this.props.boost.turnUntil(1);
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
        <Grid columns={3} divided style={{ height: '100vh' }}>
          <Grid.Row stretched style={{ "height": "20%" }}>
            <Grid.Column />
            <Grid.Column>
              <Image
                src={ControlUp}
                onClick={() => this.controlClick("up")}
              />
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
          <Grid.Row stretched style={{ "height": "20%" }}>
            <Grid.Column>
              <Image
                src={ControlLeft}
                onClick={() => this.controlClick("left")}
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src={ControlStop}
                onClick={() => this.controlClick("stop")}
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src={ControlRight}
                onClick={() => this.controlClick("right")}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched style={{ "height": "20%" }}>
            <Grid.Column />
            <Grid.Column>
              <Image
                src={ControlDown}
                onClick={() => this.controlClick("down")}
              />
            </Grid.Column>
            <Grid.Column />
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
