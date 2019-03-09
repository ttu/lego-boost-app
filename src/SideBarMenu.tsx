import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Sidebar, Segment, Button } from 'semantic-ui-react';

class SideBarMenu extends React.Component {
  state = { visible: false };

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            Show sidebar
          </Button>
          <Button disabled={!visible} onClick={this.handleHideClick}>
            Hide sidebar
          </Button>
        </Button.Group>

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
        <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              {this.props.content}
            </Segment>
          </Sidebar.Pusher>

      </Sidebar.Pushable>
      </div>
    );
  }
}

export default SideBarMenu;

// export default withRouter(SideBarMenu);
