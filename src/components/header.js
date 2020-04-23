import React from 'react'
import { Menu } from 'antd'

const Header = () => {
    return (
        <div style={{display: 'flex'}}>
            <div style={{marginRight: 20}}>
                ReactFire
            </div>
            <Menu theme="light" mode="horizontal" selectedKeys={['home']}>
                <Menu.Item key='home'>Home</Menu.Item>
                <Menu.Item key='tutorials'>Tutorials</Menu.Item>
                <Menu.Item key='blog'>Blog</Menu.Item>
                <Menu.Item key='templates'>Templates</Menu.Item>
                <Menu.Item key='contact'>Contact</Menu.Item>
            </Menu>
        </div>
    )
}

export default Header