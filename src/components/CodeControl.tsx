import LegoBoost from 'lego-boost-browser';
import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Grid, TextArea, Button, Header, Container, Accordion, Icon, Divider, Message } from 'semantic-ui-react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

import MessageBlock from './MessageBlock';
import { legoBoostTypes } from './data/BoostTypes';
import { CODE_EXAMPLES } from './data/CodeExamples';

interface IProps {
  boost: LegoBoost;
  infoVisible: boolean;
  infoToggle: () => void;
  code: string;
  updateCode: (code: string) => void;
}

interface IState {
  codeToRun: string;
  activeIndex: number;
  executionError: string;
}

const INFO_TEXT = `// Insert the code inside the async function.
// Press the Execute button to run the code.`;

const TEMPLATE = `${INFO_TEXT}

import LegoBoost from 'lego-boost-browser';

const boost = new LegoBoost();

async () => {
%CODE%
}`;

const MONACO_OPTIONS: monacoEditor.editor.IEditorConstructionOptions = {
  selectOnLineNumbers: true,
  language: 'typescript',
  formatOnPaste: true,
};

class CodeControl extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      codeToRun: this.props.code || CODE_EXAMPLES[0].code,
      executionError: '',
      activeIndex: 0,
    };

    // Need to set this at the constructor as can't set before eval and remove after that as using async function, it is not known when eval is ready
    (window as any).boost = this.props.boost;

    // Execute will throw Unhandled Rejection (ReferenceError)
    window.onunhandledrejection = e => {
      this.setState({ executionError: e.reason.message || 'Unknown error' });
    };
  }

  componentWillUnmount = () => {
    this.props.updateCode(this.state.codeToRun);
  };

  handleItemClick = (e, { name }) => {
    this.setState({ executionError: '' });
    // eval evaluates a string as a JavaScript expression within the current execution scope and can access local variables
    // Typescript eval doesn't create closures on their creation context. They are always created on global scope. Maybe like new Function()?
    // Wrap executble code to a function
    const functionToExecute = `(async () => {${this.state.codeToRun}})()`;
    eval(functionToExecute);
    // new Function(`return async function() {${this.state.codeToRun}}`)()();
  };

  updateMonacoCode = (newValue: string, ev: monacoEditor.editor.IModelContentChangedEvent) => {
    let codeToRun = newValue.substr(newValue.indexOf('async () => {') + 14);
    codeToRun = codeToRun.substr(0, codeToRun.length - 2);
    this.setState({ codeToRun });
  };

  handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  editorWillMount = (monaco: typeof monacoEditor) => {
    monaco.languages.onLanguage('typescript', () => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(legoBoostTypes, 'lego-boost-browser.d.ts');
    });
  };

  editorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco) => {
    editor.focus();
    editor.onDidChangeCursorSelection(e => {
      const readOnly = e.selection.startLineNumber <= 8;
      editor.updateOptions({ readOnly });
    });
    editor.onKeyDown(e => {
      if (e.keyCode === monacoEditor.KeyCode.Enter) {
        editor.updateOptions({ readOnly: false });
      }
    });
    editor.getAction('editor.action.formatDocument').run();
  };

  copyCode = id => this.setState({ codeToRun: CODE_EXAMPLES[id].code });

  render() {
    return (
      <Container>
        {/* TODO: Figue out why closing this trigger componentWillUnmount multiple times */}
        {/* <MessageBlock visible={this.props.infoVisible} onClose={this.props.onInfoClose} content={INFO_TEXT} /> */}

        <Container textAlign="left">
          <MonacoEditor
            language="typescript"
            value={TEMPLATE.replace('%CODE%', this.state.codeToRun)}
            options={MONACO_OPTIONS}
            width="100%"
            height="400"
            onChange={this.updateMonacoCode}
            editorWillMount={this.editorWillMount}
            editorDidMount={this.editorDidMount}
          />
        </Container>

        <br />

        <Grid centered columns="equal">
          <Grid.Row>
            <Button color="green" name="execute" onClick={this.handleItemClick}>
              <Icon name="code" />
              Execute
            </Button>
          </Grid.Row>
          <Grid.Row>
            {this.state.executionError !== '' ? <Message negative>{this.state.executionError}</Message> : null}
          </Grid.Row>
        </Grid>

        <Divider />

        <Container>
          <Accordion>
            <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleAccordionClick}>
              <Header as="h3">
                <Icon name="dropdown" />
                Example code
              </Header>
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 0}>
              <Header as="h5">Copy/paste the code from example to the execution text area and press execute</Header>

              <Container textAlign="center" fluid>
                {CODE_EXAMPLES.map((example, index) => (
                  <Container key={example.header}>
                    <Header as="h4">{example.header}</Header>
                    <Container>{example.description}</Container>
                    <TextArea value={example.code} readOnly autoHeight style={{ minWidth: 400, maxWidth: 500 }} />
                    <Button
                      circular
                      className="code-copy"
                      color="blue"
                      size="mini"
                      icon="paste"
                      onClick={this.copyCode.bind(this, index)}
                    />
                    <Divider />
                  </Container>
                ))}
              </Container>

              <pre style={{ textAlign: 'left', maxWidth: 350, margin: '0 auto' }}>
                <h4>Supported functions</h4>
                Check documentation from:
                <br />
                <a href="https://github.com/ttu/node-movehub-async#hub">node-movehub-async</a>
                <br />
                <a href="https://github.com/hobbyquaker/node-movehub#hub">node-movehub</a>
                <br />
                <br />
                boost is the class with Lego Boost control functionality.
                <br />
                <br />
                boost.drive(distance)
                <br />
                boost.turn(degrees)
                <br />
                boost.motorTimeAsync(motorPort, seconds, dutyCycle)
                <br />
                boost.motorTimeMultiAsync(seconds, powerA, powerB)
                <br />
                boost.motorAngleAsync(motorPort, angle, power)
                <br />
                boost.motorAngleMultiAsync(angle, powerA, powerB)
                <br />
                boost.ledAsync(color)
                <br />
                boost.changeLed()
                <br />
                boost.deviceInfo.distance
                <br />
                <br />
                await in the front of the function means, that the execution will wait that the sent command is finished
                <br />
              </pre>
            </Accordion.Content>
          </Accordion>
        </Container>
      </Container>
    );
  }
}

export default CodeControl;
