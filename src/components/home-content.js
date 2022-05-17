import React, { useEffect, useState } from 'react'
import '../styles/home-content.css'
import { Button, Col, Divider, Row } from 'antd'
import { navigate } from 'gatsby'
import PostListing from './post-listing'
import TutorialListing from './tutorial-listing'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { AuthService } from '../services/auth-service'

const HomeContent = () => {
    const [user, setUser] = useState(null)

    const viewTutorials = () => {
        navigate('/tutorials')
    }

    const viewTemplates = () => {
        navigate('/templates')
    }

    const viewBlogs = () => {
        navigate('/blog')
    }

    const getInitials = user => {
        if (user)
            return user.firstName.substr(0, 1) + user.lastName.substr(0, 1)
        else
            return '-'
    }

    useEffect(() => {
        AuthService.currentUser().then(result => {
            console.log(result);
            setUser(result)
        })
    }, [])

    return (
        <div style={{padding: 20}}>
            <div style={{display: 'flex', justifyContent: 'flex-end', padding: 10, background: '#f5f5f5', borderRadius: 20, marginBottom: 20, alignItems: 'center'}}>
                <div style={{width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 153, 255)', borderRadius: '100%', color: 'white', marginRight: 10}}>{getInitials(user)}</div>
                {user && <div style={{fontWeight: 'bold'}}>{user.firstName} {user.lastName}</div>}
            </div>

        {/* <div style={{display: 'flex', flexDirection: 'row'}}> */}
            <Row>
                <Col xs={0} sm={0} md={4} lg={3}>
            <div style={{marginRight: 20}}>
                <h3><ArrowLeftOutlined style={{marginRight: 10, marginBottom: 20}} /> Menu</h3>

                <button style={{
                            background: 'rgba(61, 61, 61, 0.05)',
                            borderStyle: 'none',
                            padding: 10,
                            borderRadius: 28,
                            color: 'rgb(143, 230, 76)',
                            cursor: 'pointer',
                            width: '100%',
                            marginRight: 20,
                            fontWeight: 'bold',
                        }}>Browse</button>
                <button style={{
                            background: 'rgba(61, 61, 61, 0.05)',
                            borderStyle: 'none',
                            padding: 10,
                            borderRadius: 28,
                            color: 'rgb(61, 61, 61)',
                            cursor: 'pointer',
                            width: '100%',
                            marginRight: 20,
                            marginTop: 10,
                            fontWeight: 'bold'
                        }}>Coders Hub</button>
            </div>
            </Col>
            <Col xs={24} sm={24} md={20} lg={21}>
            <div style={{flex: 1}}>
                <div style={{width: '100%', background: "linear-gradient(105deg, #5c61ff 0%, hsl(214, 100%, 84%) 100%)", borderRadius: 20, padding: 30, overflow: 'hidden', position: 'relative'}}>
                    <Row>
                        <Col xs={24} sm={24} md={16} lg={12}>
                        <span style={{color: 'white', fontSize: 64, fontWeight: 'bold', display: 'block'}}>Browse our<br />useful <span style={{color: 'rgb(143, 230, 76)'}}>Tutorials</span></span>
                        <div>
                        <span style={{color: 'white'}}>Nunc quis tortor ut diam scelerisque volutpat ac ut felis. Nullam tincidunt lacinia eleifend. Vestibulum nisi augue, commodo sed tellus sed, condimentum lobortis orci. Aenean eu enim et arcu finibus facilisis nec vel orci.</span>
                        </div>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={8}>
                        <img src='/images/ssss.webp' style={{
                    }} />
                        </Col>
                    </Row>
                    
                    
                </div>

                <div style={{marginTop: 20, background: '#f5f5f5', borderRadius: 20, border: '1px solid #dedede', padding: 15, marginBottom: 20}}>
                    <div style={{fontWeight: 'bold', fontSize: 20}}>Browse Tutorials</div>
                </div>

                <TutorialListing limit={6} />
            </div>
            </Col>
            </Row>
        </div>
    )
}

export default HomeContent