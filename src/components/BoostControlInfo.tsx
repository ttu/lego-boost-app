import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { ControlData } from '../Models';
import LegoBoost from 'lego-boost-browser';

interface BoostControlInfoProps {
  boost: LegoBoost;
}

class BoostControlInfo extends React.Component<BoostControlInfoProps, ControlData> {
  boost: LegoBoost;
  stateUpdaterId: NodeJS.Timeout;
  stateUpdateInterval = 500;

  constructor(props) {
    super(props);
    this.boost = this.props.boost;
    this.state = { ...this.boost.controlData };
  }

  componentDidMount = () => {
    this.stateUpdaterId = setInterval(() => {
      this.setState({
        state: this.boost.controlData.state,
        input: this.boost.controlData.input,
        speed: this.boost.controlData.speed,
        turnAngle: this.boost.controlData.turnAngle,
        updateInputMode: this.boost.controlData.updateInputMode,
      });
    }, this.stateUpdateInterval);
  };

  componentWillUnmount() {
    clearInterval(this.stateUpdaterId);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return true;
  };

  render() {
    return (
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Speed</Table.Cell>
            <Table.Cell>{this.state.speed}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Turn Angle</Table.Cell>
            <Table.Cell>{this.state.turnAngle}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Input mode</Table.Cell>
            <Table.Cell>{this.state.input}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default BoostControlInfo;
