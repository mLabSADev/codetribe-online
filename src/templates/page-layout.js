import React from 'react'
import { Layout, Row, Col } from "antd"
import Header from "../components/header"
import Footer from "../components/footer"
import '../styles/page-layout.css'

const PageLayout = ({ children, title, active, header, withPadding = true }) => {
    return (
        <Layout>
            <Layout.Header style={{ background: 'white' }}>
                <Header active={active} />
            </Layout.Header>
            <Layout.Content>

                <div>
                    {header}
                </div>
                <Row style={{ marginTop: 40 }}>
                    <Col xs={0} md={2} lg={4}></Col>
                    <Col xs={24} md={20} lg={16}>
                        <div style={{ background: 'white', marginBottom: 40, minHeight: 280, paddingTop: withPadding ? 40 : 0, paddingBottom: 20, paddingLeft: withPadding ? 40 : 0, paddingRight: withPadding ? 40 : 0 }}>
                            {title && <h1 style={{marginTop: 0, paddingTop: 0}}>{title}</h1>}
                            {children}
                        </div>
                    </Col>
                </Row>
            </Layout.Content>
            <Layout.Footer style={{ background: '#101010' }}>
                <Footer />
            </Layout.Footer>
        </Layout>
    )
}

export default PageLayout