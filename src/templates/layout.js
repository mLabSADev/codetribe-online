import { Layout, Menu, Modal } from 'antd'
import React, { useState } from 'react'
import Drawer from '../components/drawer'
import EditProfile from '../modals/edit-profile'

const CourseProgress = ({
    progress,
    course,
    image
}) => {
    

    return (
        <div style={{
            position: 'relative',
            display: 'inline-block'
        }}>
        <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#ffffff',
            marginLeft: 5,
            marginRight: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {[0, 90, 180, 270].map((deg, index) => (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100vw',
                    height: '100vw',
                    background: '#82c803',
                    transformOrigin: '0 0',
                    transform: `rotate(${deg}deg) skew(${index === 3 ? '20' : '0'}deg)`
                }} />
            )) }
            <img src={image} style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: '#dfdfdf',
                zIndex: 10000
            }} />
        </div>
        
        </div>
    )
}

const PageLayout = ({children, active}) => {
    const [collapsed, setCollapsed] = useState(true)
    const [loggedIn, setLoggedIn] = useState(true)
    const [showEditProfile, setShowEditProfile] = useState(false)

    const onCloseEditProfile = () => {
        setShowEditProfile(false)
    } 

    const toggleMenu = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Layout style={{ minHeight: '100vh' }} hasSider>
            <Layout.Sider collapsedWidth='50' collapsible trigger={null} collapsed={false}>
                <div style={{
                    background: 'white',
                    minHeight: '100vh',
                    position: 'fixed',
                    width: 200
                    // minWidth: '100vh'
                }}>
                    <div style={{
                        position: 'relative',
                        width: '200px'
                    }}>
                        <Drawer active={active} />
                    </div>
                    
                </div>
            </Layout.Sider>

            <Layout>
                <Layout.Header  style={{ background: 'white', padding: 0, position: 'relative', height: 80 }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: '100%',
                        marginRight: 20
                    }}>
                        <div style={{flex: 1}} />
                        <span style={{marginRight: 10}}>Course Progress</span>
                        <CourseProgress image={'/images/react.png'} progress={50} course='reactjs' />
                        <CourseProgress image={'/images/react-native.png'} progress={78} course='react-native' />
                        <CourseProgress image={'/images/ionic.png'} progress={20} course='ionic' />
                    </div>
                </Layout.Header>
                <Layout.Content style={{background: 'white'}}>
                    <div style={{paddingRight: 20}}>
                        {children}
                    </div>
                </Layout.Content>
            
            </Layout>
            {showEditProfile && <EditProfile onCancel={onCloseEditProfile} />}
        </Layout>
        
    )
}

export default PageLayout