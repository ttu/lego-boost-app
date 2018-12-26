import LegoBoost from "lego-boost-browser";
import * as React from "react";
import { Grid, TextArea, Button, TextAreaProps, Header, Container, Accordion, Icon, Divider } from "semantic-ui-react";
import MessageBlock from "./MessageBlock";

interface IProps {
  boost: LegoBoost;
  infoVisible: boolean;
  onInfoClose: Function;
}

interface IState {
  codeToRun: string;
  activeIndex: number;
}

const codeExamples = [
  {
    header: 'Change the color of the led',
    description: 'Choose one color: red, blue, green, pink',
    code: `boost.led('red');`
  },
  {
    header: 'Drive and back',
    description: 'Drive 40cm, turn 180 degrees and drive 40cm',
    code: `boost.drive(40);
boost.turn(180);
boost.drive(40);`
  },
  {
    header: 'Drive for 500 motor degrees',
    description: 'Turn motors A and B for 20% power for 500 degrees',
    code: `boost.motorAngleMulti(500, 20, 20);`
  },
  {
    header: 'Drive a circle',
    description: 'Drive a circle for 60 seconds',
    code: `boost.motorTimeMulti(60, 50, 10);`
  },
  {
    header: 'Drive a square route',
    description: 'Drive 50cm, turn 90 degree. Repeat this 4 times. Should complete a square',
    code: `const distanceToDrive = 50;
const degreestoTurn = 90;

boost.drive(distanceToDrive);
boost.turn(degreestoTurn);
boost.drive(distanceToDrive);
boost.turn(degreestoTurn);
boost.drive(distanceToDrive);
boost.turn(degreestoTurn);
boost.drive(distanceToDrive);`
  },
  {
    header: 'Drive until reach an object',
    description: 'If distance sendor reading is over 100, drive for 10 angles. Repeat',
    code: `while (true) {
  if (boost.deviceInfo.distance > 100) {
    boost.motorAngleMulti(10, 100, 100)
  } else {
    break;
  }
}`
  }
]


class CodeControl extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      codeToRun: `boost.changeLed();`,
      activeIndex: 0
    };
  }

  handleItemClick = (e, { name }) => {
    // eval evaluates a string as a JavaScript expression within the current execution scope and can access local variables
    // Typescript eval doesn't create closures on their creation context. They are always created on global scope. Maybe like new Function()?
    (window as any).boost = this.props.boost;
    eval(this.state.codeToRun);
    (window as any).boost = null;
  };

  updateCode = (e,data: TextAreaProps) => {
    this.setState({ codeToRun: data.value.toString() });
  };

  handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  
  render() {
    return (
      <Container>
        <MessageBlock visible={this.props.infoVisible} onClose={this.props.onInfoClose} content="Control Lego Boost by executing javascript code." />
        
        <Grid centered columns="equal">
          <Grid.Row>
            <Header as="h3">Execute Code Control</Header>
          </Grid.Row>
          <Grid.Row>
            <TextArea
            placeholder="Execute code"
            value={this.state.codeToRun}
            onChange={this.updateCode}
            style={{ minHeight: 100, minWidth:400 }}
          />
          </Grid.Row>
          <Grid.Row>
            <Button primary name="execute" onClick={this.handleItemClick}>Execute</Button>
          </Grid.Row>
        </Grid>

        <Divider />
        
        <Container>
          <Accordion>
            <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleAccordionClick}>
              <Header as='h3'><Icon name="dropdown" />Example code</Header>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 0}>
              <Header as="h5">Copy/paste the code from example to the execution text area and press execute</Header>

              <Container textAlign="center" fluid>
              {codeExamples.map(example => (
                <Container>
                  <Header as="h4">{example.header}</Header>
                  <Container>{example.description}</Container>
                  <TextArea value={example.code} readonly autoHeight style={{ minWidth:400 }} />
                  <Divider />
                </Container>
              ))};
              
              <Divider />

              <pre style={{ textAlign: 'left', maxWidth: 400, margin: '0 auto' }}>
              <h4>Supported functions</h4>
              Descriptions coming soon.<br/>
              <br/>
              boost.drive(distance)<br/>
              boost.turn(degrees)<br/>
              boost.motorTime(motorPort, seconds, dutyCycle)<br/>
              boost.motorTimeMulti(seconds, powerA, powerB)<br/>
              boost.motorAngle(motorPort, angle, power)<br/>
              boost.motorAngleMulti(angle, powerA, powerB)<br/>
              boost.led(color)<br/>
              boost.changeLed()<br/>
              boost.deviceInfo.distance<br/>
              boost.deviceInfo.color<br/>
              </pre>
              </Container>
            </Accordion.Content>
          </Accordion>
        </Container>
      </Container>
    );
  }
}

export default CodeControl;
