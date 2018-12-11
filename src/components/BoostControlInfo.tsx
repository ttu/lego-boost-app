import * as React from "react";
import { Table } from "semantic-ui-react";
import { IControlData } from "../Models";

class BoostControlInfo extends React.Component<IControlData> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Control Info</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Speed</Table.Cell>
            <Table.Cell>{this.props.speed}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Turn Angle</Table.Cell>
            <Table.Cell>{this.props.turnAngle}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default BoostControlInfo;
