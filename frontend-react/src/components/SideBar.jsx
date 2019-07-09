import React from 'react'
import { Icon, Menu, Sidebar, Image } from 'semantic-ui-react'

const SideBar = () => (
  <div className="ts-nav-container">
    <Sidebar
      as={Menu}
      icon="labeled"
      animation="slide out"
      inverted
      vertical
      visible
      width="thin"
    >
      <Menu.Item as="a">
        <Image src="logo.png" size="tiny" centered />
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="clock outline" />
        Home
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="gamepad" />
        Games
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="camera" />
        Channels
      </Menu.Item>
    </Sidebar>
  </div>
)

export default SideBar
