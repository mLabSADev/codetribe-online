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

const Header = ({active, toggleMenu}) => {
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
                <div style={{padding: 10, width: '100%', background: '#00586a', display: 'flex', alignItems: 'center', position: 'relative'}}>
                    <Button type='link' style={{minWidth: 40, background: 'transparent'}} onClick={toggleMenu} size={'large'} icon={<MenuOutlined style={{color: 'white'}} />} />
                    <div style={{flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Link to='/'><img alt='ReactFire logo' src='/images/logo.png' style={{height: 40, marginRight: 40}} /></Link>
                    </div>
                    {/* <div style={{pointerEvents: 'none', position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Link to='/'><img alt='ReactFire logo' src='/images/logo.png' style={{height: 40, marginRight: 40}} /></Link>
                    </div> */}
                </div>
                // <div style={{flexGrow: 1, position: 'absolute', top: 5, left: 20}}>
                //     <Link to='/'><img alt='ReactFire logo' src='/images/logo.png' style={{height: 40, marginRight: 40}} /></Link>
                // </div>
            )}

            {/* {dimensions.width <= PHONE_BREAKPOINT && (
                <div style={{flexGrow: 1, position: 'absolute', top: 5, right: 20}}>
                    
                </div>
            )} */}
        </div>
    )
}

export default Header