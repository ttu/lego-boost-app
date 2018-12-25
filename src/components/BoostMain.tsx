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
      <Grid centered columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Button primary onClick={this.props.boost.connect.bind(this.props.boost)}>Connect</Button>
          </Grid.Column>
          <Grid.Column>
            <Button secondary onClick={this.props.boost.changeLed.bind(this.props.boost)}>Led</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BoostMain
