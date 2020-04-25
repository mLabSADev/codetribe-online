import React, { useEffect, useState } from 'react'
import { Menu, Button, Dropdown } from 'antd'
import { navigate, Link } from 'gatsby'
import { MenuOutlined } from '@ant-design/icons'

if (typeof window === 'undefined') {
    global.window = {}
}

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height} = window

    return {
        width, height
    }
}

const Header = ({active}) => {
    const PHONE_BREAKPOINT = 786
    const [dimensions, setDimensions] = useState(getWindowDimensions)

    const goToPage = ({key}) => {
        if (key === 'home') {
            key = ''
        }

        navigate(`/${key}`)
    }

    const resizeListener = () => {
        setDimensions(getWindowDimensions())
    }

    useEffect(() => {
        window.addEventListener('resize', resizeListener)
        setDimensions(getWindowDimensions())

        return () => {
            window.removeEventListener('resize', resizeListener)
        }
    }, [])

    const menu = (
        <Menu theme="light" mode="horizontal" selectedKeys={[active]} onSelect={goToPage}>
            <Menu.Item key='home'>Home</Menu.Item>
            <Menu.Item key='tutorials'>Tutorials</Menu.Item>
            <Menu.Item key='blog'>Blog</Menu.Item>
            <Menu.Item key='templates'>Templates</Menu.Item>
            <Menu.Item key='contact'>Contact</Menu.Item>
        </Menu>
    )

    return (
        <div style={{display: 'flex'}}>
            {dimensions.width > PHONE_BREAKPOINT &&<div style={{marginRight: 20}}>
                <Link to='/'><img alt='ReactFire logo' src='/images/logo.png' style={{height: 40, marginRight: 40}} /></Link>
            </div>}
            {dimensions.width > PHONE_BREAKPOINT && menu}

            {dimensions.width <= PHONE_BREAKPOINT && (
                <div style={{flexGrow: 1, position: 'absolute', top: 5, left: 20}}>
                    <Link to='/'><img alt='ReactFire logo' src='/images/logo.png' style={{height: 40, marginRight: 40}} /></Link>
                </div>
            )}

            {dimensions.width <= PHONE_BREAKPOINT && (
                <div style={{flexGrow: 1, position: 'absolute', top: 5, right: 20}}>
                    <Dropdown trigger={['click']} overlay={menu}>
                        <Button size={'large'} icon={<MenuOutlined />} />
                    </Dropdown>
                </div>
            )}
        </div>
    )
}

export default Header