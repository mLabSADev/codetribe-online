import React from 'react'
import { Menu } from 'antd'
import { navigate, Link } from 'gatsby'

const Header = ({active}) => {
    const goToPage = ({key}) => {
        if (key === 'home') {
            key = ''
        }

        navigate(`/${key}`)
    }

    return (
        <div style={{display: 'flex'}}>
            <div style={{marginRight: 20}}>
                <Link to='/'><img alt='ReactFire logo' src='/images/logo.png' style={{height: 40, marginRight: 40}} /></Link>
            </div>
            <Menu theme="light" mode="horizontal" selectedKeys={[active]} onSelect={goToPage}>
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