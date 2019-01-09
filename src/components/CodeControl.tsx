import LegoBoost from "lego-boost-browser";
import * as React from "react";
import MonacoEditor from 'react-monaco-editor';
import { Grid, TextArea, Button, TextAreaProps, Header, Container, Accordion, Icon, Divider, Message } from "semantic-ui-react";
import MessageBlock from "./MessageBlock";

interface IProps {
  boost: LegoBoost;
  infoVisible: boolean;
  onInfoClose: Function;
  code: string,
  updateCode: Function
}

interface IState {
  codeToRun: string;
  activeIndex: number;
  executionError: string
}

const TITLE = `/* Control Lego Boost by executing javascript code.
* Insert your own code under this comment or remove this comment
* Press the Execute button to run the code
*
* 1) If site is loaded anywhere else than the Main-tab, code hightlight will not work
* 2) Syntax highlight will show errors on working code
*/

`;

const CODE_EXAMPLES = [
  {
    header: 'Change the color of the led',
    description: 'Change the color from red to green. Supported colors: off, pink, purple, blue, lightblue, cyan, green, yellow, orange, red, white',
    code: `await boost.ledAsync('red');
await boost.ledAsync('yellow');
await boost.ledAsync('green');`
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
    description: 'Repeat motor command for 5 times. Every other time motor A power is 30 and B is 10. Every other power for A is 10 and B is 30.',
    code: `for(let i = 0; i < 6; i++){
  if (i % 2 == 0)
    await boost.motorAngleMultiAsync(500, 30, 10);
  else
    await boost.motorAngleMultiAsync(500, 10, 30);
}`
  },
  {
    header: `Turn Vernie's head`,
    description: `Turn Vernie's head first to the left, wait 1 second, turn to the right, wait 1 second, then back to the center.`,
    code: `await boost.motorAngleAsync('D', 50, 10);
await new Promise(resolve => setTimeout(resolve, 1000));
await boost.motorAngleAsync('D', 100, -10);
await new Promise(resolve => setTimeout(resolve, 1000));
await boost.motorAngleAsync('D', 50, 10);`
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
];

const MONACO_OPTIONS = {
  selectOnLineNumbers: true,
  language: 'typescript'
};

class CodeControl extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      codeToRun: this.props.code || CODE_EXAMPLES[0].code,
      executionError: '',
      activeIndex: 0
    };

    // Need to set this at the constructor as can't set before eval and remove after that as using async function, it is not known when eval is ready
    (window as any).boost = this.props.boost;

    // Execute will throw Unhandled Rejection (ReferenceError)
    window.onunhandledrejection = (e) => {
      this.setState({ executionError: e.reason.message || 'Unknown error' });
    };
  }

  componentWillUnmount = () => {
    this.props.updateCode(this.state.codeToRun);
  }

  handleItemClick = (e, { name }) => {
    this.setState({ executionError: '' });
    // eval evaluates a string as a JavaScript expression within the current execution scope and can access local variables
    // Typescript eval doesn't create closures on their creation context. They are always created on global scope. Maybe like new Function()?
    // Wrap executble code to a function
    const functionToExecute = `(async () => {${this.state.codeToRun}})()`;
    eval(functionToExecute); 
    // new Function(`return async function() {${this.state.codeToRun}}`)()();
  };

  updateMonacoCode = (newValue, e) => {
    this.setState({ codeToRun: newValue });
  };

  handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  editorWillMount = (monaco) => {
    // TODO: Eject CRA, so can use plugins and defined used languages
    // https://github.com/superRaytin/react-monaco-editor
    // Or figure out how to do with this: https://medium.com/@haugboelle/short-guide-to-using-monaco-with-create-react-app-26a1acad8ebe
    // monaco.languages.onLanguage('typescript', () => {
    //   monaco.languages.typescript.javascriptDefaults.addExtraLib(`
    //     import * as ts from './typescript';
    //     export = ts;
    //     export as namespace typescript;
    //   `, 'global.d.ts');

    //   monaco.languages.typescript.javascriptDefaults.addExtraLib(`
    //     import LegoBoost from 'lego-boost-browser';
    //     boost = new LegoBoost();
    //     export = boost;
    //     export as boost;
    //   `, 'boost.d.ts');
    // });
  }

  editorDidMount = (editor, monaco) => {
    editor.focus();
  }

  render() {
    return (
      <Container>
        <MessageBlock visible={this.props.infoVisible} onClose={this.props.onInfoClose} content="Control Lego Boost by executing javascript code." />

        <Container textAlign="left">
          <MonacoEditor 
            language="typescript"
            value={this.state.codeToRun}
            options={MONACO_OPTIONS}
            width="100%"
            height="400"
            onChange={this.updateMonacoCode}
            editorWillMount={this.editorWillMount}
            editorDidMount={this.editorDidMount}
          />
        </Container>

        <br/>

        <Grid centered columns="equal">
          <Grid.Row>
            <Button primary name="execute" onClick={this.handleItemClick}>Execute</Button>
          </Grid.Row>
          <Grid.Row>
            {this.state.executionError !== '' ? (<Message negative>{this.state.executionError}</Message>): (null)}
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
              {CODE_EXAMPLES.map(example => (
                <Container key={example.header}>
                  <Header as="h4">{example.header}</Header>
                  <Container>{example.description}</Container>
                  <TextArea value={example.code} readOnly autoHeight style={{ minWidth: 400, maxWidth: 500 }} />
                  <Divider />
                </Container>
              ))}
              </Container>

              <pre style={{ textAlign: 'left', maxWidth: 350, margin: '0 auto' }}>
                <h4>Supported functions</h4>
                Descriptions coming soon.<br/>
                <br/>
                boost is the class with Lego Boost functionality.<br/>
                <br/>
                It has been already created and is used by the application to control the Lego Boost:<br/>
                const boost = new LegoBoost(bluetoothCommunication)<br/>
                <br/>
                boost.drive(distance)<br/>
                boost.turn(degrees)<br/>
                boost.motorTimeAsync(motorPort, seconds, dutyCycle)<br/>
                boost.motorTimeMultiAsync(seconds, powerA, powerB)<br/>
                boost.motorAngleAsync(motorPort, angle, power)<br/>
                boost.motorAngleMultiAsync(angle, powerA, powerB)<br/>
                boost.ledAsync(color)<br/>
                boost.changeLed()<br/>
                boost.deviceInfo.distance<br/>
                boost.deviceInfo.color<br/>
                <br/>
                Check documentation from:<br/>
                <a href="https://github.com/ttu/node-movehub-async#hub">node-movehub-async</a><br/>
                <a href="https://github.com/hobbyquaker/node-movehub#hub">node-movehub</a><br/>
                <br/>
                await in the front of the command means, that execution will wait that sent command is finished<br/>
              </pre>
            </Accordion.Content>
          </Accordion>
        </Container>
      </Container>
    );
  }
}

export default CodeControl;
