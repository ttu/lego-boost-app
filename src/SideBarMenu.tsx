import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Sidebar, Segment, Button, Icon, Container } from 'semantic-ui-react';

interface IBarState {
  visible: boolean;
}
class SideBarMenu extends React.Component<{}, IBarState> {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  handleShowClick = () => this.setState(prevState => ({ visible: !prevState.visible }));
  handleSidebarHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Sidebar.Pushable as={Segment}>
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
              Home
            </Menu.Item>
            <Menu.Item active={location.pathname === '/code'} as={Link} to="/code" onClick={this.handleSidebarHide}>
              <Icon name="file code outline" />
              Code Editor Control
            </Menu.Item>
            <Menu.Item active={location.pathname === '/ai'} as={Link} to="/ai" onClick={this.handleSidebarHide}>
              <Icon name="wechat" />
              Artificial Intelligence
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
              <Icon name="sidebar" />Menu
            </Menu.Item>
            <Menu.Item position="right">
              Lego Boost Control
            </Menu.Item>
          </Menu>
          {/* <div className="mainmenu">
            <Button onClick={this.handleShowClick}>
              <Icon name="sidebar" /> Menu
            </Button>
          </div> */}
          <Sidebar.Pusher className="main" dimmed={visible}>
            <Segment>{this.props.children}</Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default SideBarMenu;

// export default withRouter(SideBarMenu);
