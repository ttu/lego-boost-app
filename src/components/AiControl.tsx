import LegoBoost from 'lego-boost-browser';
import * as React from 'react';
import { Grid, Button, Container } from 'semantic-ui-react';
import MessageBlock from './MessageBlock';
import { ControlData, State } from 'lego-boost-browser/dist/types';

interface AiControlProps {
  boost: LegoBoost;
  infoVisible: boolean;
  infoToggle: () => void;
  controlData: ControlData;
}

const states = ['Drive', 'Back', 'Seek', 'Turn', 'Manual'];

const createStates = (currentState?: State) =>
  states.map(state => (
    <Grid.Column key={state} className={currentState === state ? 'info-item selected' : 'info-item'}>
      <div>{state}</div>
    </Grid.Column>
  ));

const AiControl = (props: AiControlProps) => (
  <Container>
    <MessageBlock
      visible={props.infoVisible}
      infoToggle={props.infoToggle}
      content="AI-mode controls Lego Boost automatically. When sensor notices an object, the robot will try to turn away from the object and continue driving. If it notices the object too late, the robot will back away and turn to a new direction."
    />
    <Grid centered columns="equal">
      <Grid.Row centered>
        <Button.Group>
          <Button positive size="huge" onClick={() => props.boost.ai()}>
            Start
          </Button>
          <Button.Or text="AI" />
          <Button negative size="huge" onClick={() => props.boost.stop()}>
            Stop
          </Button>
        </Button.Group>
      </Grid.Row>
    </Grid>
    <Grid centered>
      <Grid.Row>
        <h3>AI State</h3>
      </Grid.Row>
      <Grid.Row>{createStates(props.controlData.state)}</Grid.Row>
    </Grid>
  </Container>
);

export default AiControl;
