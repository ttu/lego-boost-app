import * as React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Menu } from 'semantic-ui-react'


const MainMenu = ({ location }) => (
  <Menu pointing secondary>
    <Menu.Item active={location.pathname === '/'}>
      <Link to="/">Main</Link>
    </Menu.Item>
    <Menu.Item active={location.pathname === '/manual'}>
      <Link to="/manual">Manual</Link>
    </Menu.Item>
  </Menu>
);

export default withRouter(MainMenu)
