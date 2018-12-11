import LegoBoost from "lego-boost-browser";
import * as React from "react";
import { IControlData } from "../Models";
import BoostControlInfo from "./BoostControlInfo";

interface IProps {
  boost: LegoBoost;
  controlData: IControlData;
}

class ManualControl extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const controlProps = { ...this.props.controlData };

    return (
      <div className="ManualControl">
        <div>ManualControl</div> 
        <BoostControlInfo {...controlProps} />
      </div>
    );
  }
}

export default ManualControl;
