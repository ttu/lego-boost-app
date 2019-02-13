import LegoBoost from 'lego-boost-browser';
import * as React from 'react';
import { Grid, Button, Container, Dropdown } from 'semantic-ui-react';
import MessageBlock from './MessageBlock';
import { IBoostConfig } from '../Models';

interface IProps {
  boost: LegoBoost;
  infoVisible: boolean;
  onInfoClose: () => void;
  configuration: IBoostConfig;
  updataConfig: (c: IBoostConfig) => void;
  resetConfig: () => void;
}

class BoostConfiguration extends React.Component<IProps> {
  stateOptions = [ 
    { key: 'A', value: 'A', text: 'A' },
    { key: 'B', value: 'B', text: 'B' },
    // { key: 'C', value: 'C', text: 'C' },
    // { key: 'D', value: 'D', text: 'D' }
  ]
  
  constructor(props) {
    super(props);
  }

  setCarMode = () => {
    this.props.updataConfig({ leftMotor: 'B', rightMotor: 'A' });
  }

  setVernieMode = () => {
    this.props.updataConfig({ leftMotor: 'A', rightMotor: 'B' });
  }

  setDriveFineTune = (value) => {
    const original = this.props.configuration.driveFinetune || 1.0;
    this.props.updataConfig({ driveFinetune: original + value });
  }

  setTurnFineTune = (value) => {
    const original = this.props.configuration.turnFinetune || 1.0;
    this.props.updataConfig({ turnFinetune: original + value });
  }

  setLeftMotor= (ev, data)  => this.setMotor(data.value, 'leftMotor');

  setRightMotor= (ev, data) => this.setMotor(data.value, 'rightMotor');

  setMotor = (value, side) => {
    const other = side === 'leftMotor' ? 'rightMotor' : 'leftMotor';
    let otherValue = this.props.configuration[other];
    
    if (value === otherValue) {
      otherValue = value === 'A' ? 'B' : 'A';
    }

    this.props.updataConfig({ [side]: value, [other]: otherValue });
  }


  render() {
    return (
      <Container>
        <MessageBlock visible={this.props.infoVisible} onClose={this.props.onInfoClose} content="Reconnect the Lego Boost after configuration changes. Configuration is saved to browser's storage." />
        <Grid centered columns="equal">
          <Grid.Row>
            Motor modes
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column textAlign="right">
              <Button secondary onClick={this.setVernieMode}>Vernie</Button>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Button secondary onClick={this.setCarMode}>Car (A/B back)</Button>
            </Grid.Column>
            <Grid.Column textAlign="left">
              <Button secondary onClick={this.setVernieMode}>Car (A/B front)</Button>
            </Grid.Column> 
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="right"> 
              Left: <Dropdown search selection options={this.stateOptions} value={this.props.configuration.leftMotor} onChange={this.setLeftMotor} />
            </Grid.Column> 
            <Grid.Column textAlign="left"> 
              Right: <Dropdown search selection options={this.stateOptions} value={this.props.configuration.rightMotor} onChange={this.setRightMotor} />
            </Grid.Column> 
          </Grid.Row>
          <Grid.Row>
            Finetunes
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column textAlign="right">
              <Grid.Row textAlign="center">
                Drive: {this.props.configuration.driveFinetune}
              </Grid.Row>
              <Grid.Row>  
                <Button icon="left chevron" onClick={() => this.setDriveFineTune(-0.01)} />
                <Button icon="right chevron" onClick={() => this.setDriveFineTune(0.01)} />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column textAlign="left">
              <Grid.Row textAlign="center">
                Turn: {this.props.configuration.turnFinetune}
              </Grid.Row>
              <Grid.Row>
                <Button icon="left chevron" onClick={() => this.setTurnFineTune(-0.01)} />
                <Button icon="right chevron" onClick={() => this.setTurnFineTune(0.01)} />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column textAlign="center">
              <Button secondary onClick={this.props.resetConfig}>Reset config</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default BoostConfiguration;
