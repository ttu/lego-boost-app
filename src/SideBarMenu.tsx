import * as React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sidebar, Segment, Icon } from 'semantic-ui-react';

interface IBarProps {
  connected: boolean;
  connect: () => void;
}

interface IBarState {
  visible: boolean;
}

class SideBarMenu extends React.Component<IBarProps, IBarState> {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  handleShowClick = () => this.setState(prevState => ({ visible: !prevState.visible }));
  handleSidebarHide = () => this.setState({ visible: false });

  getConnectedItem = () =>
    this.props.connected ? (
      <div className="connect-item" onClick={_ => this.props.connect()}>
        <Icon name="circle" color="green" />
        Connected
      </div>
    ) : (
      <div className="connect-item" onClick={_ => this.props.connect()}>
        <Icon name="circle" color="red" />
        Not connected
      </div>
    );

  render() {
    const { visible } = this.state;

    return (
      <Sidebar.Pushable as={Segment} className="all-content">
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={visible}
          width="wide"
        >
          <Menu.Item active={location.pathname === '/'} as={Link} to="/" onClick={this.handleSidebarHide}>
            <Icon name="home" />
            Main
          </Menu.Item>
          <Menu.Item active={location.pathname === '/code'} as={Link} to="/code" onClick={this.handleSidebarHide}>
            <Icon name="file code outline" />
            Code Editor
          </Menu.Item>
          <Menu.Item active={location.pathname === '/ai'} as={Link} to="/ai" onClick={this.handleSidebarHide}>
            <Icon name="wechat" />
            AI Mode
          </Menu.Item>
          <Menu.Item active={location.pathname === '/manual'} as={Link} to="/manual" onClick={this.handleSidebarHide}>
            <Icon name="gamepad" />
            Manual Control
          </Menu.Item>
          <Menu.Item active={location.pathname === '/motors'} as={Link} to="/motors" onClick={this.handleSidebarHide}>
            <Icon name="server" />
            Individual Motors
          </Menu.Item>
          <Menu.Item active={location.pathname === '/config'} as={Link} to="/config" onClick={this.handleSidebarHide}>
            <Icon name="dashboard" />
            Configure
          </Menu.Item>
          <Menu.Item active={location.pathname === '/info'} as={Link} to="/info" onClick={this.handleSidebarHide}>
            <Icon name="info circle" />
            Info
          </Menu.Item>
        </Sidebar>
        <Menu fixed="top" inverted>
          <Menu.Item onClick={this.handleShowClick}>
            <Icon name="sidebar" />
            Menu
          </Menu.Item>
          <Menu.Item>{this.getConnectedItem()}</Menu.Item>
          <Menu.Item position="right">Lego Boost Control</Menu.Item>
        </Menu>
        <Sidebar.Pusher className="main-content">
          <Segment>{this.props.children}</Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default SideBarMenu;
