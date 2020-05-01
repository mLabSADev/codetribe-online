import React, { useState } from 'react'
import { Layout, Row, Col, Menu } from "antd"
import Header from "../components/header"
import Footer from "../components/footer"
import '../styles/page-layout.css'
const PageLayout = ({ children, title, active, header, withPadding = true, fullscreen = false, background = 'white' }) => {
    const [collapsed, setCollapsed] = useState(true)

    const toggleMenu = () => {
        setCollapsed(!collapsed)
    }
    
    return (
        <Layout style={{ minHeight: '100vh' }} hasSider>
            <Layout.Sider onClick={toggleMenu} style={{position: 'absolute', zIndex: 10000, minHeight: '100vh'}} trigger={null} collapsedWidth='0' collapsible collapsed={collapsed}>
                <Menu theme='dark'>
                    <Menu.Item key='1'>Home</Menu.Item>
                    <Menu.Item key='2'>Tutorials</Menu.Item>
                    <Menu.Item key='3'>Blog</Menu.Item>
                    <Menu.Item key='4'>Templates</Menu.Item>
                    <Menu.Item key='5'>Contact</Menu.Item>
                </Menu>
            </Layout.Sider>
            <Layout>
                <Layout.Header style={{ background: 'white', padding: 0 }}>
                    <Header active={active} toggleMenu={toggleMenu} />
                </Layout.Header>
                <Layout.Content>
                    <div>
                        {header}
                    </div>
                    <Row style={{ marginTop: 40 }}>
                        <Col span={fullscreen ? 0 : null} xs={0} md={2} lg={4}></Col>
                        <Col span={fullscreen ? 24 : null} xs={fullscreen ? null : 24} md={fullscreen ? null : 20} lg={fullscreen ? null : 16}>
                            <div style={{ background: background, marginBottom: 40, minHeight: 280, paddingTop: withPadding ? 40 : 0, paddingBottom: 20, paddingLeft: withPadding ? 40 : 0, paddingRight: withPadding ? 40 : 0 }}>
                                {title && <h1 style={{ marginTop: 0, paddingTop: 0 }}>{title}</h1>}
                                {children}
                            </div>
                        </Col>
                    </Row>
                </Layout.Content>
                <Layout.Footer style={{ background: '#101010' }}>
                    <Footer />
                </Layout.Footer>
            </Layout>
        </Layout>
    )
}

export default PageLayout