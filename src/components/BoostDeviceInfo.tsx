import * as React from "react";
import { Table } from "semantic-ui-react";
import { IDeviceInfo } from "../Models";
import LegoBoost from "lego-boost-browser";

interface IProps {
  boost: LegoBoost
}

class BoostDeviceInfo extends React.Component<IProps, IDeviceInfo> {
  boost: LegoBoost;
  stateUpdaterId: NodeJS.Timeout;
  stateUpdateInterval = 200;

  constructor(props) {
    super(props);
    this.boost = this.props.boost;
    this.state = {
      color: '',
      connected: false,
      distance: 0,
      error: '',
      rssi: 0,
      ports: {
        A: { action: '', angle: 0 },
        B: { action: '', angle: 0 },
        AB: { action: '', angle: 0 },
        C: { action: '', angle: 0 },
        D: { action: '', angle: 0 },
        LED: { action: '', angle: 0 },
      }
    };
  }

  componentDidMount = () => {
    this.stateUpdaterId = setInterval(() => {
      this.setState({
        color: this.boost.deviceInfo.color,
        connected: this.boost.deviceInfo.connected,
        distance: this.boost.deviceInfo.distance,
        error: this.boost.deviceInfo.error,
        rssi: this.boost.deviceInfo.rssi,
        ports: {
          A: { action: this.boost.deviceInfo.ports.A.action, angle: this.boost.deviceInfo.ports.A.angle },
          B: { action: this.boost.deviceInfo.ports.B.action, angle: this.boost.deviceInfo.ports.B.angle },
          AB: { action: this.boost.deviceInfo.ports.AB.action, angle: this.boost.deviceInfo.ports.AB.angle },
          C: { action: this.boost.deviceInfo.ports.C.action, angle: this.boost.deviceInfo.ports.C.angle },
          D: { action: this.boost.deviceInfo.ports.D.action, angle: this.boost.deviceInfo.ports.D.angle },
          LED: { action: this.boost.deviceInfo.ports.LED.action, angle: this.boost.deviceInfo.ports.LED.angle }
        }
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
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Device Info</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Connected</Table.Cell>
            <Table.Cell>{this.state.connected ? "yes" : "no"}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Sensor color</Table.Cell>
            <Table.Cell>{this.state.color}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Distance</Table.Cell>
            <Table.Cell>{this.state.distance === Number.MAX_SAFE_INTEGER ? 'Not connected': this.state.distance}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>RSSI</Table.Cell>
            <Table.Cell>{this.state.rssi}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Error</Table.Cell>
            <Table.Cell>{this.state.error}</Table.Cell>
          </Table.Row>
          {Object.keys(this.state.ports).map(element => (
            <Table.Row key={element}>
              <Table.Cell>{element}</Table.Cell>
              <Table.Cell>
                Action: {this.state.ports[element].action} - Angle: {this.state.ports[element].angle}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default BoostDeviceInfo;
