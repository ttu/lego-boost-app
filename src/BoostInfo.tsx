import * as React from 'react';
import { Button, Grid } from 'semantic-ui-react'

interface IBoostInfo {
  distance: number
  ledColor: string
}

class BoostSpecs extends React.Component<IBoostInfo> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="BoostMain">
        <Grid columns="one" divided>
          <Grid.Row>
            <Grid.Column>
              <label>LED: {this.props.ledColor}</label>
            </Grid.Column>
            <Grid.Column>
              <label>Distance: {this.props.distance}</label>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default BoostSpecs
