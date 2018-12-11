import LegoBoost from "lego-boost-browser";
import * as React from "react";
import { TextArea, Button, TextAreaProps } from "semantic-ui-react";

interface IProps {
  boost: LegoBoost;
}

interface IState {
  codeToRun: string;
}

class CodeControl extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      codeToRun: `boost.changeLed();`
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

  render() {
    return (
      <div className="CodeControl">
        <div>Execute Code Control</div>
        <div>
          <TextArea
            placeholder="Execute code"
            value={this.state.codeToRun}
            onChange={this.updateCode}
            style={{ minHeight: 100 }}
          />
        </div>
        <Button primary name="execute" onClick={this.handleItemClick}>Execute</Button>
      </div>
    );
  }
}

export default CodeControl;
