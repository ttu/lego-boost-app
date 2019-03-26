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
            <Menu.Item active={location.pathname === '/'}>
              <Link to="/">Main</Link>
            </Menu.Item>
            <Menu.Item active={location.pathname === '/manual'}>
              <Link to="/manual">Manual</Link>
            </Menu.Item>
            <Menu.Item active={location.pathname === '/motors'}>
              <Link to="/motors">Motors</Link>
            </Menu.Item>
            <Menu.Item active={location.pathname === '/ai'}>
              <Link to="/ai">AI</Link>
            </Menu.Item>
            <Menu.Item active={location.pathname === '/code'}>
              <Link to="/code">Code</Link>
            </Menu.Item>
            <Menu.Item active={location.pathname === '/config'}>
              <Link to="/config">Config</Link>
            </Menu.Item>
            <Menu.Item active={location.pathname === '/info'}>
              <Link to="/info">Info</Link>
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
