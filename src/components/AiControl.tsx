import LegoBoost from 'lego-boost-browser';
import * as React from 'react';
import { Grid, Button, Container } from 'semantic-ui-react';
import MessageBlock from './MessageBlock';

interface AiControlProps {
  boost: LegoBoost;
  infoVisible: boolean;
  infoToggle: () => void;
}

class AiControl extends React.Component<AiControlProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <MessageBlock
          visible={this.props.infoVisible}
          infoToggle={this.props.infoToggle}
          content="AI-mode controls Lego Boost automatically. When sensor notices an object, the robot will try to turn away from the object and continue driving. If it notices the object too late, the robot will back away and turn to a new direction."
        />
        <Grid centered columns="equal">
          <Grid.Row centered>
            <Button.Group>
              <Button positive size="huge" onClick={this.props.boost.ai.bind(this.props.boost)}>
                Start
              </Button>
              <Button.Or text="AI" />
              <Button negative size="huge" onClick={this.props.boost.stop.bind(this.props.boost)}>
                Stop
              </Button>
            </Button.Group>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default AiControl;
