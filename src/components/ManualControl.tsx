import LegoBoost from "lego-boost-browser";
import * as React from "react";
import BoostControlInfo from "./BoostControlInfo";
import { Grid, Image } from "semantic-ui-react";
import ControlStop from "../image.png";
import ControlUp from "../triangle-up.svg";
import ControlDown from "../triangle-down.svg";
import ControlLeft from "../triangle-left.svg";
import ControlRight from "../triangle-right.svg";

interface IProps {
  boost: LegoBoost;
}

class ManualControl extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  imageClick = async name => {
    console.log(name);
    switch (name) {
      case "stop":
        await this.props.boost.stop();
        break;
      case "left":
        await this.props.boost.turnUntil(0);
        break;
      case "right":
        await this.props.boost.turnUntil(1);
        break;
      case "up":
        await this.props.boost.driveUntil();
        break;
      case "down":
        await this.props.boost.driveUntil(-1000);
        break;
    }
  };

  render() {
    const controlProps = { ...this.props };

    return (
      <div>
        <Grid columns={3} divided>
          <Grid.Row stretched>
            <Grid.Column>
              <Image
                src={ControlLeft}
                onClick={() => this.imageClick("left")}
              />
            </Grid.Column>
            <Grid.Column>
              <Image src={ControlUp} onClick={() => this.imageClick("up")} />
              <Image
                src={ControlStop}
                onClick={() => this.imageClick("stop")}
              />
              <Image
                src={ControlDown}
                onClick={() => this.imageClick("down")}
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src={ControlRight}
                onClick={() => this.imageClick("right")}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <BoostControlInfo {...controlProps} />
      </div>
    );
  }
}

export default ManualControl;
