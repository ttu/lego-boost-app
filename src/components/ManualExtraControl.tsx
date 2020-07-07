import LegoBoost from 'lego-boost-browser';
import * as React from 'react';
import { Grid, Button, Dropdown, Icon, Accordion, Header } from 'semantic-ui-react';

import BoostControlInfo from './BoostControlInfo';
import { ControlMode } from '../Models';

interface ManualExtraControlProps {
  boost: LegoBoost;
  extraControlsVisible: boolean;
  onExtraControlsToggle: () => void;
  controlMode: ControlMode;
  onUpdateControlMode: (controlModel: ControlMode) => void;
}

interface ManualExtraControlState {
  lastCommand: string;
  mode: ControlMode;
  ledColor: string;
  activeIndex: number;
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

class ManualExtraControl extends React.Component<ManualExtraControlProps, ManualExtraControlState> {
  constructor(props: ManualExtraControlProps) {
    super(props);
    this.state = {
      lastCommand: '',
      mode: props.controlMode || ControlMode.Click,
      ledColor: 'off',
      activeIndex: props.extraControlsVisible ? 0 : -1,
    };
  }

  handleLedChange = (e, { value }) => this.setState({ ledColor: value });

  render() {
    const controlProps = { ...this.props };

    return (
      <div className="manual-controls">
        <Grid>
          <Grid.Row columns={2} centered>
            <Header as="h4">
              <Icon name="gamepad" />
              Select Control Mode
            </Header>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="right">
              <Button
                color={this.state.mode === ControlMode.Click ? 'red' : 'grey'}
                onClick={() => this.props.onUpdateControlMode(ControlMode.Click)}
              >
                <Icon name="pointing up" />
                Click Mode
              </Button>
            </Grid.Column>
            <Grid.Column textAlign="left">
              <Button
                color={this.state.mode === ControlMode.Arcade ? 'red' : 'grey'}
                onClick={() => this.props.onUpdateControlMode(ControlMode.Arcade)}
              >
                <Icon name="gamepad" />
                Arcade Mode
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1} centered>
            <Header as="h4">
              <Icon name="lightbulb" />
              Set Led Color
            </Header>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="right">
              <Dropdown options={LED_COLORS} value={this.state.ledColor} onChange={this.handleLedChange} />
            </Grid.Column>
            <Grid.Column textAlign="left">
              <Button primary onClick={async () => await this.props.boost.ledAsync(this.state.ledColor)}>
                <Icon name="lightbulb outline" />
                Set Color
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1} centered>
            <Header as="h4">
              <Icon name="info" />
              Control Information
            </Header>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <BoostControlInfo {...controlProps} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default ManualExtraControl;
