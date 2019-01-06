import LegoBoost from "lego-boost-browser";
import * as React from "react";
import { IControlData } from "../Models";
import { Grid, Button, Container, Segment, Header } from "semantic-ui-react";
import { Slider } from "react-semantic-ui-range";
import MessageBlock from "./MessageBlock";

interface IProps {
  boost: LegoBoost;
  infoVisible: boolean;
  onInfoClose: Function;
}

interface IState {
  A: number,
  B: number,
  AB: number,
  C: number,
  D: number
}

class MotorControl extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state= {
      A: 0,
      B: 0,
      AB: 0,
      C: 0,
      D: 0
    }
  }

  componentWillUnmount = () => {
    this.props.boost.stop();
  }

  render() {

    const createColumn = (port) => {
      return (<Grid.Column width={16}>
        <Segment>
          <Header as="h1">{port} : {this.state[port]}</Header>
          <Slider color="red" inverted={false}
            settings={{
            start: this.state[port],
            min:-100,
            max:100,
            step:1,
            onChange: (value) => {
              // @ts-ignore
              this.setState({ [port]: value });
              this.props.boost.motorAngle(port, 3600, value);
            }
          }}/>
        </Segment>
      </Grid.Column>);
    };

    return (
      <Container>
        <MessageBlock 
          visible={this.props.infoVisible} 
          onClose={this.props.onInfoClose} 
          content="Control individial motors" />
        <Grid padded>
          {createColumn('A')}
          {createColumn('B')}
          {createColumn('AB')}
          {createColumn('C')}
          {createColumn('D')}
        </Grid>
      </Container>
    );
  }
}

export default MotorControl;
