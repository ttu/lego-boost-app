import LegoBoost from 'lego-boost-browser';
import * as React from 'react';
import { Button, Grid, Container } from 'semantic-ui-react'
import MessageBlock from './MessageBlock';

interface IProps {
  boost: LegoBoost;
  infoVisible: boolean;
  onInfoClose: Function
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
        <MessageBlock visible={this.props.infoVisible} onClose={this.props.onInfoClose} content="Click Connect and go to Manual, AI or Code page and start controlling your Lego Boost. Note! For now only works with Vernie setup." />
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Button primary onClick={this.props.boost.connect.bind(this.props.boost)}>Connect</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default BoostMain
