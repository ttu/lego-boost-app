import LegoBoost from "lego-boost-browser";
import * as React from "react";
import { Container, Grid, Image, Button, Dropdown } from "semantic-ui-react";

import BoostControlInfo from "./BoostControlInfo";


interface IProps {
  boost: LegoBoost;
}

interface IManualState {
  lastCommand: string;
  mode: string,
  ledColor: string
}

const LED_COLORS = [ 
  { key: 'off', value: 'off', text: 'Off' },
  { key: 'pink', value: 'pink', text: 'Pink' },
  { key: 'purple', value: 'purple', text: 'Purple' },
  { key: 'blue', value: 'blue', text: 'Blue' },
  { key: 'lightblue', value: 'lightblue', text: 'Lightblue' },
  { key: 'cyan', value: 'cyan', text: 'Cyan' },
  { key: 'green', value: 'green', text: 'Green' },
  { key: 'yellow', value: 'yellow', text: 'Yellow' },
  { key: 'orange', value: 'orange', text: 'Orange' },
  { key: 'red', value: 'red', text: 'Red' },
  { key: 'white', value: 'white', text: 'White' }
]

class ManualControl extends React.Component<IProps, IManualState> {
  constructor(props) {
    super(props);
    this.state = {
      lastCommand: '',
      mode: 'B',
      ledColor: 'off'
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

  handleLedChange = (e, { value }) => this.setState({ ledColor: value })

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
            <Grid.Column textAlign="right">
              <Button primary={this.state.mode === 'A'}
                      secondary={this.state.mode !== 'A'} 
                      onClick={() => this.setState({ mode: 'A' })}>
                Click Mode
              </Button>
              </Grid.Column>
              <Grid.Column textAlign="left">
              <Button primary={this.state.mode === 'B'}
                      secondary={this.state.mode !== 'B'} 
                      onClick={() => this.setState({ mode: 'B' })}>
                Arcade Mode
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column  textAlign="right">
              <Dropdown options={LED_COLORS} value={this.state.ledColor} onChange={this.handleLedChange}/>
            </Grid.Column>
            <Grid.Column textAlign="left">
              <Button secondary onClick={async () => await this.props.boost.ledAsync(this.state.ledColor)}>
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
