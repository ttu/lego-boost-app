import LegoBoost from 'lego-boost-browser';
import * as React from 'react';
import { Button, Grid, Container } from 'semantic-ui-react'
import MessageBlock from './MessageBlock';
import { IConfiguration } from 'lego-boost-browser/dist/hub/hubAsync';

interface IProps {
  boost: LegoBoost;
  infoVisible: boolean;
  onInfoClose: () => void;
  configuration?: IConfiguration;
}

class BoostMain extends React.Component<IProps> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // TODO
  };

  handleItemClick = (e, { name }) => {
    // TODO
  };

  render() {
    return (
      <Container>
        <MessageBlock visible={this.props.infoVisible} onClose={this.props.onInfoClose} content="Click Connect and pair with LEGO Move Hub. Go to Manual, AI or Code page and start controlling your Lego Boost. Note! For now only works with Vernie setup. Lego Boost might show up as a Unknown or unsupported device or as a LEGO Move Hub in the connection dialog." />
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Button primary onClick={this.props.boost.connect.bind(this.props.boost, this.props.configuration)}>Connect</Button>
              {/* <Button secondary onClick={this.props.boost.disconnect.bind(this.props.boost)}>Disconnect</Button> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default BoostMain;
