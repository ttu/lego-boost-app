import * as React from 'react';
import { Table, Accordion, Icon, Header } from 'semantic-ui-react';
import { IDeviceInfo } from '../Models';
import LegoBoost from 'lego-boost-browser';

interface IProps {
  boost: LegoBoost;
}

interface IDeviceInfoAccordion extends IDeviceInfo {
  activeIndex: number;
}

class BoostDeviceInfo extends React.Component<IProps, IDeviceInfoAccordion> {
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
      },
      activeIndex: 0,
    };
  }

  handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  componentDidMount = () => {
    this.stateUpdaterId = setInterval(() => {
      this.setState({
        color: this.boost.deviceInfo.color,
        connected: this.boost.deviceInfo.connected,
        distance: this.boost.deviceInfo.distance,
        error: this.boost.deviceInfo.error,
        rssi: this.boost.deviceInfo.rssi,
        ports: {
          A: {
            action: this.boost.deviceInfo.ports.A.action,
            angle: this.boost.deviceInfo.ports.A.angle,
          },
          B: {
            action: this.boost.deviceInfo.ports.B.action,
            angle: this.boost.deviceInfo.ports.B.angle,
          },
          AB: {
            action: this.boost.deviceInfo.ports.AB.action,
            angle: this.boost.deviceInfo.ports.AB.angle,
          },
          C: {
            action: this.boost.deviceInfo.ports.C.action,
            angle: this.boost.deviceInfo.ports.C.angle,
          },
          D: {
            action: this.boost.deviceInfo.ports.D.action,
            angle: this.boost.deviceInfo.ports.D.angle,
          },
          LED: {
            action: this.boost.deviceInfo.ports.LED.action,
            angle: this.boost.deviceInfo.ports.LED.angle,
          },
        },
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
      <Accordion fluid>
        <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleAccordionClick}>
          <Header as="h3">
            <Icon name="dropdown" />
            Lego Boost Info
          </Header>
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 0}>
          <Table definition>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Connected</Table.Cell>
                <Table.Cell positive={this.state.connected} negative={!this.state.connected}>
                  {this.state.connected ? 'Yes' : 'No'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Sensor color</Table.Cell>
                <Table.Cell cellspan="2">{this.state.color}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Distance</Table.Cell>
                <Table.Cell>
                  {this.state.distance === Number.MAX_SAFE_INTEGER ? <Icon name="close" /> : this.state.distance}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>RSSI</Table.Cell>
                <Table.Cell>{this.state.rssi === 0 ? <Icon name="close" /> : this.state.rssi}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Error message</Table.Cell>
                <Table.Cell>{this.state.error === '' ? 'No errors from the Boost' : this.state.error}</Table.Cell>
              </Table.Row>
              <Table.Row />
            </Table.Body>
          </Table>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Motor</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
                <Table.HeaderCell>Angle</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.keys(this.state.ports).map(element => (
                <Table.Row key={element}>
                  <Table.Cell>{element}</Table.Cell>
                  <Table.Cell>{this.state.ports[element].action}</Table.Cell>
                  <Table.Cell>{this.state.ports[element].angle}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default BoostDeviceInfo;
