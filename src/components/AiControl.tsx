import LegoBoost from "lego-boost-browser";
import * as React from "react";
import { IControlData } from "../Models";

interface IProps {
  boost: LegoBoost;
}

class AiControl extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="AiControl">
        <div>AI Control</div>
      </div>
    );
  }
}

export default AiControl;
