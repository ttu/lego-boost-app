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
      <div className="BoostMain">
        <Grid columns="five" divided>
          <Grid.Row>
            <Grid.Column>
              <Button primary onClick={this.props.boost.connect.bind(this.props.boost)}>Connect</Button>
            </Grid.Column>
            <Grid.Column>
              <Button secondary onClick={this.props.boost.changeLed.bind(this.props.boost)}>Led</Button>
            </Grid.Column>
            <Grid.Column>
              <Button secondary onClick={this.props.boost.ai.bind(this.props.boost)}>AI</Button>
            </Grid.Column>
            <Grid.Column>
              <Button secondary onClick={this.props.boost.stop.bind(this.props.boost)}>Stop</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default BoostMain
