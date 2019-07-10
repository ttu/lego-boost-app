import LegoBoost from 'lego-boost-browser';
import * as React from 'react';
import { Grid } from 'semantic-ui-react';

import { ControlMode } from '../Models';

interface IManualProps {
  boost: LegoBoost;
  controlMode: ControlMode;
}

interface IManualState {
  lastCommand: string;
  mode: ControlMode;
}

enum Command {
  None = 'none',
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
  Stop = 'stop',
}

class ManualControl extends React.Component<IManualProps, IManualState> {
  constructor(props: IManualProps) {
    super(props);
    this.state = {
      lastCommand: '',
      mode: props.controlMode || ControlMode.Click,
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
      </div>
    );
  }
}

export default ManualControl;
