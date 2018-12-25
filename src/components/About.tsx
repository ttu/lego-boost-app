import * as React from "react";
import { Container, Table, Accordion } from "semantic-ui-react";

type AboutProps = {
  version?: string;
  date?: string;
};

// const About: React.FunctionComponent<AboutProps> = ({  version, date  }) =>
const About = ({ version, date }: AboutProps) => (
  <Container>
    <Table definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>About</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
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
    <p>Read more from: <a href="https://github.com/ttu/lego-boost-app">https://github.com/ttu/lego-boost-app</a></p>
  </Container>
);

export default About;
