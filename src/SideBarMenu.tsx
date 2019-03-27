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
            <Menu.Item active={location.pathname === '/'} as={Link} to="/">
              <Icon name="home" />Home
            </Menu.Item>
            <Menu.Item active={location.pathname === '/manual'} as={Link} to="/manual">
              <Icon name="gamepad" />Manual
            </Menu.Item>
            <Menu.Item active={location.pathname === '/motors'} as={Link} to="/motors">
              <Icon name="server" />Motors
            </Menu.Item>
            <Menu.Item active={location.pathname === '/ai'} as={Link} to="/ai">
              <Icon name="wechat" />AI
            </Menu.Item>
            <Menu.Item active={location.pathname === '/code'} as={Link} to="/code">
              <Icon name="file code outline" />Code editor
            </Menu.Item>
            <Menu.Item active={location.pathname === '/config'} as={Link} to="/config">
              <Icon name="dashboard" />Configure
            </Menu.Item>
            <Menu.Item active={location.pathname === '/info'} as={Link} to="/info">
              <Icon name="info circle" />Info
            </Menu.Item>
          </Sidebar>
          <div className="mainmenu">
            <Button onClick={this.handleShowClick}>
              <Icon name="sidebar" /> Menu
            </Button>
          </div>
          <Sidebar.Pusher dimmed={visible}>
            <Segment className="content full height">{this.props.children}</Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default SideBarMenu;

// export default withRouter(SideBarMenu);
