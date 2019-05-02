import LegoBoost from 'lego-boost-browser';
import * as React from 'react';
import { Button, Grid, Container, Icon, Message } from 'semantic-ui-react';
import MessageBlock from './MessageBlock';
import { IConfiguration } from 'lego-boost-browser/dist/hub/hubAsync';

interface IProps {
  boost: LegoBoost;
  infoVisible: boolean;
  infoToggle: () => void;
  configuration?: IConfiguration;
}

class BoostMain extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  isIos = () => /(iPhone|iPad|iPod)/.test(navigator.userAgent);

  render() {
    if (this.isIos()) {
      return (
        <Container>
          <Message
            negative
            icon="apple"
            header="Apple iOS not supported"
            content="Unfortunately Apple iOS (iPhone, iPad) doesn't support Web Bluetooth API, so Lego Boost Control can't connect to Bluetooth devices"
          />
        </Container>
      );
    }

    return (
      <Container>
        <MessageBlock
          visible={this.props.infoVisible}
          infoToggle={this.props.infoToggle}
          content="Click Connect and pair with LEGO Move Hub. Go to Manual, AI or Code page and start controlling your Lego Boost. Note! Lego Boost might show up as a Unknown or unsupported device or as a LEGO Move Hub in the connection dialog."
        />
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Button color="green" onClick={this.props.boost.connect.bind(this.props.boost, this.props.configuration)}>
                <Icon name="bluetooth b" />
                Connect
              </Button>
              {/* <Button secondary onClick={this.props.boost.disconnect.bind(this.props.boost)}>Disconnect</Button> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default BoostMain;
