import LegoBoost from 'lego-boost-browser';
import * as React from 'react';
import { Grid, Button, Container } from 'semantic-ui-react';
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
  constructor(props) {
    super(props);
  }

  setCarMode = () => {
    this.props.updataConfig({ leftMotor: 'B', rightMotor: 'A' });
  }

  setVernieMode = () => {
    this.props.updataConfig({ leftMotor: 'A', rightMotor: 'B' });
  }

  render() {
    return (
      <Container>
        <MessageBlock visible={this.props.infoVisible} onClose={this.props.onInfoClose} content="Reconnect the Lego Boost after configuration changes. Configuration is saved to browsers storage." />
        <Grid centered columns="equal">
          <Grid.Row centered>
            <Grid.Column textAlign="right">
              <Button secondary onClick={this.setVernieMode}>Vernie</Button>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button secondary onClick={this.setCarMode}>Car</Button>
            </Grid.Column>
            <Grid.Column textAlign="left">
              <Button secondary onClick={this.setVernieMode}>Car reverse</Button>
            </Grid.Column> 
          </Grid.Row>
          <Grid.Row>
            <section>
              Motor left: {this.props.configuration.leftMotor} | right: {this.props.configuration.rightMotor}
            </section>
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
