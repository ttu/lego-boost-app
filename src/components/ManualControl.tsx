import LegoBoost from "lego-boost-browser";
import * as React from "react";
import { Container, Grid, Image, Button } from "semantic-ui-react";

import BoostControlInfo from "./BoostControlInfo";


interface IProps {
  boost: LegoBoost;
}

interface IManualState {
  lastCommand: string;
  mode: string
}

class ManualControl extends React.Component<IProps, IManualState> {
  constructor(props) {
    super(props);
    this.state = {
      lastCommand: '',
      mode: 'A'
    };
  }

  controlClick = async (command: string) => {
    this.setState({ lastCommand: command });
    await this.handleCommand(command);
  };

  controlRelease = async (command: string) => {
    if (this.state.mode === 'B') {
      await this.props.boost.stop();
      this.setState({ lastCommand: `stop ${command}` });
    }
  }

  handleCommand = async (command: string) => {
    switch (command) {
      case 'stop':
        await this.props.boost.stop();
        break;
      case 'left':
        await this.props.boost.turn(-90 * (this.state.mode === 'A' ? 1 : 400));
        break;
      case 'right':
        await this.props.boost.turn(90 * (this.state.mode === 'A' ? 1 : 400));
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

    const createControl = (name) => {
      return (<Grid.Column className={name+"-control"} 
                    onMouseDown={() => this.controlClick(name)} 
                    onTouchStart={() => this.controlClick(name)} 
                    onMouseUp={() => this.controlRelease(name)}/>);
    };

    return (
      <Container>
        <Grid columns={3} celled padded style={{ height: "90vh" }}>
          <Grid.Row style={{ height: "33%" }}>
            <Grid.Column />
            {createControl('up')}
            <Grid.Column />
          </Grid.Row>
          <Grid.Row style={{ height: "33%" }}>
            {createControl('left')}
            {createControl('stop')}
            {createControl('right')}
          </Grid.Row>
          <Grid.Row style={{ height: "33%" }}>
            <Grid.Column />
            {createControl('down')}
            <Grid.Column />
          </Grid.Row>
        </Grid>

        <Grid>
          {/* <Grid.Row columns={1}>
            <Grid.Column>Last command: {this.state.lastCommand}</Grid.Column>
          </Grid.Row> */}
          <Grid.Row columns={2}>
            <Grid.Column>
              <Button primary={this.state.mode === 'A'}
                      secondary={this.state.mode !== 'A'} 
                      onClick={() => this.setState({ mode: 'A' })}>
                Click Mode
              </Button>
              </Grid.Column>
              <Grid.Column>
              <Button primary={this.state.mode === 'B'}
                      secondary={this.state.mode !== 'B'} 
                      onClick={() => this.setState({ mode: 'B' })}>
                Arcade Mode
              </Button>
            </Grid.Column>
          </Grid.Row>
          {/* <Grid.Row columns={1}>
            <Grid.Column>
              <Button secondary onClick={this.props.boost.changeLed.bind(this.props.boost)}>
                Change led color
              </Button>
            </Grid.Column>
          </Grid.Row> */}
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
