import LegoBoost from "lego-boost-browser";
import * as React from "react";
import { IControlData } from "../Models";
import { Grid, Button, Container } from "semantic-ui-react";
import MessageBlock from "./MessageBlock";

interface IProps {
  boost: LegoBoost;
  infoVisible: boolean;
  onInfoClose: Function;
}

class AiControl extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <MessageBlock visible={this.props.infoVisible} onClose={this.props.onInfoClose} content="AI-mode controls Lego Boost automatically. When sensor notices an object, the robot will try to turn away from the object and continue driving. If it notices the object too late, the robot will back away and turn to a new direction." />
        <Grid centered columns="equal">
          <Grid.Row centered>
            <Grid.Column textAlign="right">
              <Button secondary onClick={this.props.boost.ai.bind(this.props.boost)}>AI</Button>
            </Grid.Column>
            <Grid.Column textAlign="left">
              <Button secondary onClick={this.props.boost.stop.bind(this.props.boost)}>Stop</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default AiControl;
