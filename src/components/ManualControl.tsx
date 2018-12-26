import LegoBoost from "lego-boost-browser";
import * as React from "react";
import { Container, Grid, Image, Button } from "semantic-ui-react";

import BoostControlInfo from "./BoostControlInfo";


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
            <Grid.Column onClick={() => this.controlClick("up")} className="up-control">
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
          <Grid.Row style={{ height: "33%" }}>
            <Grid.Column  className="left-control" onClick={() => this.controlClick("left")}>
            </Grid.Column>
            <Grid.Column  className="stop-control" onClick={() => this.controlClick("stop")}>
            </Grid.Column>
            <Grid.Column className="right-control" onClick={() => this.controlClick("right")}>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ height: "33%" }}>
            <Grid.Column />
            <Grid.Column className="down-control" onClick={() => this.controlClick("down")}>
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
