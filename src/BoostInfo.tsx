import * as React from "react";
import { Table } from "semantic-ui-react";
import { IDeviceInfo } from "./Models";

class BoostInfo extends React.Component<IDeviceInfo> {
  constructor(props) {
    super(props);
  }

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
            <Table.Cell>{this.props.connected ? "yes" : "no"}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>LED</Table.Cell>
            <Table.Cell>{this.props.color}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Distance</Table.Cell>
            <Table.Cell>{this.props.distance}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>RSSI</Table.Cell>
            <Table.Cell>{this.props.rssi}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Error</Table.Cell>
            <Table.Cell>{this.props.error}</Table.Cell>
          </Table.Row>
          {Object.keys(this.props.ports).map(element => (
            <Table.Row>
              <Table.Cell>{element}</Table.Cell>
              <Table.Cell>
                Action: {this.props.ports[element].action} - Angle:{" "}
                {this.props.ports[element].angle}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default BoostInfo;
