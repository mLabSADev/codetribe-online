import React from 'react'
import '../styles/footer.css'
import { Row, Col, Divider } from 'antd'
import { HeartFilled } from '@ant-design/icons'

const Footer = () => {
    const alignmentStyle = {
        parent: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            paddingBottom: 20
        },
        child: {
            width: 150
        }
    }

    return (
        <div>
            <Row>
                <Col xs={16} sm={12} lg={8}>
                    <div style={alignmentStyle.parent}>
                        <div style={alignmentStyle.child}>
                            <h2>Menu</h2>
                            <a href='/'>Home</a>
                            <a href='/'>Tutorials</a>
                            <a href='/'>Blog</a>
                            <a href='/'>Templates</a>
                            <a href='/'>Contact</a>
                        </div>
                    </div>
                </Col>
                <Col xs={16} sm={12} lg={8}>
                    <div style={alignmentStyle.parent}>
                        <div style={alignmentStyle.child}>
                            <h2>Legal Stuff</h2>
                            <a href='/'>Terms of Use</a>
                            <a href='/'>Privacy Policy</a>
                        </div>
                    </div>
                </Col>
                <Col xs={16} sm={12} lg={8}>
                    <div style={alignmentStyle.parent}>
                        <div style={alignmentStyle.child}>
                            <h2>Contact Us</h2>
                            <a href='/'>hello@reactfire.com</a>
                            <a href='/'>@reactfire</a>
                            <a href='/'>@reactfire</a>
                        </div>
                    </div>
                </Col>
            </Row>
            <Divider />
            <p id='copyright'>Made with <HeartFilled style={{color: 'red'}} /> in Pretoria<br />&copy; ReactFire 2020</p>
        </div>
    )
}

export default Footer