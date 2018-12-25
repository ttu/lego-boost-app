import LegoBoost from 'lego-boost-browser';
import * as React from 'react';
import { Button, Grid } from 'semantic-ui-react'

interface IProps {
  boost: LegoBoost
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
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Button primary onClick={this.props.boost.connect.bind(this.props.boost)}>Connect</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
         <Grid.Column>
            Click Connect and go to Manual, AI or Code page and start controlling your Lego Boost.
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BoostMain
