import React from 'react'
import { Layout } from "antd"
import Header from "../components/header"
import Footer from "../components/footer"
import '../styles/page-layout.css'

const PageLayout = ({children, title, fullscreen = false, active}) => {
    return (
        <Layout>
            <Layout.Header style={{background: 'white'}}>
                <Header active={active} />
            </Layout.Header>
            <Layout.Content>
                <div style={{minHeight: 280, paddingLeft: fullscreen ? 0 : 40, paddingRight: fullscreen ? 0 : 40}}>
                    {title && <h1>{title}</h1>}
                    {children}
                </div>
            </Layout.Content>
            <Layout.Footer style={{background: '#101010'}}>
                <Footer />
            </Layout.Footer>
        </Layout>
    )
}

export default PageLayout