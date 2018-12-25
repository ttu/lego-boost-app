import LegoBoost from "lego-boost-browser";
import * as React from "react";
import { IControlData } from "../Models";
import { Grid, Button } from "semantic-ui-react";

interface IProps {
  boost: LegoBoost;
}

class AiControl extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid centered columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Button secondary onClick={this.props.boost.ai.bind(this.props.boost)}>AI</Button>
          </Grid.Column>
          <Grid.Column>
            <Button secondary onClick={this.props.boost.stop.bind(this.props.boost)}>Stop</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default AiControl;
