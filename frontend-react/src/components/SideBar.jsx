import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, Menu, Sidebar, Image } from 'semantic-ui-react'

const SideBar = ({ admin }) => (
  <div className="ts-nav-container">
    <Sidebar as={Menu} icon="labeled" animation="slide out" inverted vertical visible width="thin">
      <Menu.Item as="a">
        <Image src="logo.png" size="tiny" centered />
      </Menu.Item>
      <Menu.Item as={NavLink} to="/calendar">
        <Icon name="clock outline" />
        My Logs
      </Menu.Item>
      <Menu.Item as={NavLink} to="/projects">
        <Icon name="tasks" />
        Projects
      </Menu.Item>
      {admin && (
        <Menu.Item as={NavLink} to="/users">
          <Icon name="user circle" />
          Users
        </Menu.Item>
      )}
      <Menu.Item as={NavLink} to="/report/table">
        <Icon name="chart bar outline" />
        Report
      </Menu.Item>
      <Menu.Item as={NavLink} to="/logout">
        <Icon name="sign-out" />
        Sign out
      </Menu.Item>
    </Sidebar>
  </div>
)

export default SideBar
