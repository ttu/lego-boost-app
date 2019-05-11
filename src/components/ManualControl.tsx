import LegoBoost from 'lego-boost-browser';
import * as React from 'react';
import { Container, Grid, Button, Dropdown, Icon, Accordion, Header } from 'semantic-ui-react';

import BoostControlInfo from './BoostControlInfo';

interface IProps {
  boost: LegoBoost;
  extraControlsVisible: boolean;
  onExtraControlsToggle: () => void;
}

interface IManualState {
  lastCommand: string;
  mode: ControlMode;
  ledColor: string;
  activeIndex: number;
}

enum ControlMode {
  Click,
  Arcade,
}

enum Command {
  None = 'none',
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
  Stop = 'stop',
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
  { key: 'white', value: 'white', text: 'White' },
];

class ManualControl extends React.Component<IProps, IManualState> {
  constructor(props) {
    super(props);
    this.state = {
      lastCommand: '',
      mode: ControlMode.Click,
      ledColor: 'off',
      activeIndex: props.extraControlsVisible ? 0 : -1,
    };
  }

  controlClick = async (command: Command) => {
    this.setState({ lastCommand: command.toString() });
    await this.handleCommand(command);
  };

  controlRelease = async (command: Command) => {
    if (this.state.mode === ControlMode.Arcade) {
      await this.props.boost.stop();
      this.setState({ lastCommand: `stop ${command}` });
    }
  };

  handleCommand = async (command: Command) => {
    switch (command) {
      case Command.Stop:
        await this.props.boost.stop();
        break;
      case Command.Left:
        await this.props.boost.turn(-90 * (this.state.mode === ControlMode.Click ? 1 : 400));
        break;
      case Command.Right:
        await this.props.boost.turn(90 * (this.state.mode === ControlMode.Click ? 1 : 400));
        break;
      case Command.Up:
        await this.props.boost.driveToDirection();
        break;
      case Command.Down:
        await this.props.boost.driveToDirection(0);
        break;
    }
  };

  handleLedChange = (e, { value }) => this.setState({ ledColor: value });

  render() {
    const controlProps = { ...this.props };

    const createControl = (command: Command) => {
      return (
        <Grid.Column
          className={command + '-control'}
          onMouseDown={() => this.controlClick(command)}
          onMouseUp={() => this.controlRelease(command)}
          onTouchStart={() => this.controlClick(command)}
          onTouchEnd={() => this.controlRelease(command)}
        />
      );
    };

    return (
      <div className="manual-controls">
        <Grid columns={3} celled padded style={{ height: '81vh' }}>
          <Grid.Row style={{ height: '33%' }}>
            <Grid.Column />
            {createControl(Command.Up)}
            <Grid.Column />
          </Grid.Row>
          <Grid.Row style={{ height: '33%' }}>
            {createControl(Command.Left)}
            {createControl(Command.Stop)}
            {createControl(Command.Right)}
          </Grid.Row>
          <Grid.Row style={{ height: '33%' }}>
            <Grid.Column />
            {createControl(Command.Down)}
            <Grid.Column />
          </Grid.Row>
        </Grid>

        <Accordion className="extra-controls">
          <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.props.onExtraControlsToggle}>
            <Header as="h3">
              <Icon name="dropdown" />
              Extra controls
            </Header>
          </Accordion.Title>
          <Accordion.Content active={this.state.activeIndex === 0}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column textAlign="right">
                  <Button
                    color={this.state.mode === ControlMode.Click ? 'red' : 'grey'}
                    onClick={() => this.setState({ mode: ControlMode.Click })}
                  >
                    Click Mode
                  </Button>
                </Grid.Column>
                <Grid.Column textAlign="left">
                  <Button
                    color={this.state.mode === ControlMode.Arcade ? 'red' : 'grey'}
                    onClick={() => this.setState({ mode: ControlMode.Arcade })}
                  >
                    Arcade Mode
                  </Button>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column textAlign="right">
                  <Dropdown options={LED_COLORS} value={this.state.ledColor} onChange={this.handleLedChange} />
                </Grid.Column>
                <Grid.Column textAlign="left">
                  <Button primary onClick={async () => await this.props.boost.ledAsync(this.state.ledColor)}>
                    <Icon name="lightbulb outline" />
                    Set Led Color
                  </Button>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <BoostControlInfo {...controlProps} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Accordion.Content>
        </Accordion>
      </div>
    );
  }
}

export default ManualControl;
