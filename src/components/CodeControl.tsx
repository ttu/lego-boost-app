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
    code: `await boost.drive(40);
await boost.turn(180);
await boost.drive(40);`
  },
  {
    header: 'Drive for 500 motor degrees',
    description: 'Turn motors A and B for 20% power for 500 degrees',
    code: `await boost.motorAngleMultiAsync(500, 20, 20);`
  },
  {
    header: 'Drive a circle',
    description: 'Drive a circle for 60 seconds',
    code: `await boost.motorTimeMultiAsync(60, 50, 10);`
  },
  {
    header: 'Driva a snake',
    description: 'Repeat motor command for 5 times. Every other time motor A is 30 and B is 10. Every other A is 10 and B is 30.',
    code: `for(let i = 0; i < 6; i++){
  if (i % 2 == 0)
    await boost.motorAngleMultiAsync(500, 30, 10);
  else
    await boost.motorAngleMultiAsync(500, 10, 30);
}`
  },
  {
    header: 'Drive a square route',
    description: 'Drive 50cm, turn 90 degree. Repeat this 4 times. Should complete a square',
    code: `const distanceToDrive = 50;
const degreestoTurn = 90;

await boost.drive(distanceToDrive);
await boost.turn(degreestoTurn);
await boost.drive(distanceToDrive);
await boost.turn(degreestoTurn);
await boost.drive(distanceToDrive);
await boost.turn(degreestoTurn);
await boost.drive(distanceToDrive);`
  },
  {
    header: 'Drive until reach an object',
    description: 'If distance sendor reading is over 100, drive for 10 angles. Repeat',
    code: `while (true) {
  if (boost.deviceInfo.distance > 100) {
    await boost.motorAngleMultiAsync(10, 100, 100);
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

    // Need to set this at the constructor as can't set before eval and remove after that as using async function, it is not known when eval is ready
    (window as any).boost = this.props.boost;
  }

  handleItemClick = (e, { name }) => {
    this.setState({ codeToRun: this.state.codeToRun});
    // eval evaluates a string as a JavaScript expression within the current execution scope and can access local variables
    // Typescript eval doesn't create closures on their creation context. They are always created on global scope. Maybe like new Function()?
    // Wrap executble code to a function
    const functionToExecute = `(async () => {${this.state.codeToRun}})()`;
    eval(functionToExecute);
    // new Function(`return async function() {${this.state.codeToRun}}`)()();
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
                <Container key={example.header}>
                  <Header as="h4">{example.header}</Header>
                  <Container>{example.description}</Container>
                  <TextArea value={example.code} readOnly autoHeight style={{ minWidth: 350, maxWidth: 600 }} />
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
