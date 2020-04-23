import React from "react"
import { Layout } from "antd"
import Header from "../components/header"
import Footer from "../components/footer"
import HomeContent from "../components/home-content"

export default () => (
    <div>
        <Layout>
            <Layout.Header style={{background: 'white'}}>
                <Header />
            </Layout.Header>
            <Layout.Content>
                <div style={{minHeight: 280}}>
                    <HomeContent />
                </div>
            </Layout.Content>
            <Layout.Footer style={{background: '#101010'}}>
                <Footer />
            </Layout.Footer>
        </Layout>
    </div>
)
