import * as React from "react";
import { Container, Table, List } from "semantic-ui-react";

type AboutProps = {
  version?: string;
  date?: string;
};

// const About: React.FunctionComponent<AboutProps> = ({  version, date  }) =>
const Info = ({ version, date }: AboutProps) => (
  <Container>
    <Container textAlign="left">
      <List bulleted>
        <List.Item>Works only with computers (Windows, macOS, Linux) and Android</List.Item>
        <List.Item>Supported Browsers Chrome and Opera</List.Item>
        <List.Item>Requires https. Check that url starts with https://</List.Item>
        <List.Item> Manual control won't work. Refresh page and reconnect</List.Item>
        <List.Item> In case of problem, refresh page and reconnect</List.Item>
        <List.Item>Lego Boost's is connected and can't reconnect. Remove batteries and try again.</List.Item>
        <List.Item>Read more from: <a href="https://github.com/ttu/lego-boost-app">https://github.com/ttu/lego-boost-app</a></List.Item>
      </List>
    </Container>
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Version</Table.Cell>
          <Table.Cell>{version}</Table.Cell>
        </Table.Row>
        <Table.Cell>Build date</Table.Cell>
        <Table.Cell>{date}</Table.Cell>
        <Table.Row />
      </Table.Body>
    </Table>
  </Container>
);

export default Info;
