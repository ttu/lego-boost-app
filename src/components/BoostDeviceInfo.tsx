import * as React from 'react';
import { Table, Accordion, Icon, Header, Grid, Container, Label } from 'semantic-ui-react';
import { IDeviceInfo } from '../Models';
import LegoBoost from 'lego-boost-browser';

interface IProps {
  boost: LegoBoost;
  connectedChanged: (isConnected: boolean) => void;
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
      if (this.state.connected !== this.boost.deviceInfo.connected) {
        this.props.connectedChanged(this.boost.deviceInfo.connected);
      }

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
            Boost information
          </Header>
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 0}>
          <Grid centered className="info-items">
            <Grid.Row>
              <Grid.Column className="info-item">
                <Container>
                  <div className="info-item-heder">
                    <Icon name="bluetooth b" />
                    <label>BLE</label>
                  </div>
                  <div>Connected</div>
                  <div>
                    {this.state.connected ? <Icon name="circle" color="green" /> : <Icon name="circle" color="red" />}
                  </div>
                </Container>
              </Grid.Column>
              <Grid.Column className="info-item">
                <div className="info-item-heder">
                  <Icon name="bluetooth b" />
                  <label>BLE</label>
                </div>
                <div>RSSI</div>
                <div>{this.state.rssi === 0 ? <Icon name="close" /> : this.state.rssi}</div>
              </Grid.Column>
              <Grid.Column className="info-item">
                <div className="info-item-heder">
                  <Icon name="camera" />
                  Sensor
                </div>
                <div>Color</div>
                <div>{this.state.color ? this.state.color : <Icon name="close" />}</div>
              </Grid.Column>
              <Grid.Column className="info-item">
                <div className="info-item-heder">
                  <Icon name="camera" />
                  Sensor
                </div>
                <div>Distance</div>
                <div>
                  {this.state.distance === Number.MAX_SAFE_INTEGER ? <Icon name="close" /> : this.state.distance}
                </div>
              </Grid.Column>
            </Grid.Row>
            {/* <Grid.Row className="info-header">
              <h3>Port data</h3>
            </Grid.Row> */}
            <Grid.Row>
              {Object.keys(this.state.ports).map(element => (
                <Grid.Column className="info-item" key={element}>
                  <div className="info-item-heder">
                    <Icon name="cog" />
                    {element}
                  </div>
                  <div>Action</div>
                  <div>
                    {this.state.ports[element].action ? this.state.ports[element].action : <Icon name="close" />}
                  </div>
                  <div>Angle</div>
                  <div>{this.state.ports[element].angle}</div>
                </Grid.Column>
              ))}
            </Grid.Row>
            <Grid.Row>
            <Icon name="envelope" />
              {this.state.error === '' ? 'No messages from communication library' : `Communication library message:${this.state.error}`}
            </Grid.Row>
          </Grid>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default BoostDeviceInfo;
