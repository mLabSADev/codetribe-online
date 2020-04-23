import React from 'react'
import '../styles/footer.css'
import { Row, Col, Divider, Button } from 'antd'
import { HeartFilled, FacebookFilled, TwitterCircleFilled } from '@ant-design/icons'
import { Link } from 'gatsby'

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
                            <Link to='/'>Home</Link>
                            <Link to='/tutorials'>Tutorials</Link>
                            <Link to='/blog'>Blog</Link>
                            <Link to='/templates'>Templates</Link>
                            <Link to='/contact'>Contact</Link>
                        </div>
                    </div>
                </Col>
                <Col xs={16} sm={12} lg={8}>
                    <div style={alignmentStyle.parent}>
                        <div style={alignmentStyle.child}>
                            <h2>Legal Stuff</h2>
                            <Link to='/terms-of-use'>Terms of Use</Link>
                            <Link to='/privacy-policy'>Privacy Policy</Link>
                        </div>
                    </div>
                </Col>
                <Col xs={16} sm={12} lg={8}>
                    <div style={alignmentStyle.parent}>
                        <div style={alignmentStyle.child}>
                            <h2>Follow Us</h2>
                            <Button style={{background: '#3369ad', border: 'none', marginRight: 10}} size='large' shape='circle' icon={<FacebookFilled style={{color: 'white'}} />}></Button>
                            <Button style={{background: '#00a4ed', border: 'none'}} size='large' shape='circle' icon={<TwitterCircleFilled style={{color: 'white'}} />}></Button>
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