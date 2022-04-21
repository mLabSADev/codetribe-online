import React from 'react'
import '../styles/home-content.css'
import { Button, Divider } from 'antd'
import { navigate } from 'gatsby'
import PostListing from './post-listing'
import TutorialListing from './tutorial-listing'
import { ArrowLeftOutlined } from '@ant-design/icons'

const HomeContent = () => {
    const viewTutorials = () => {
        navigate('/tutorials')
    }

    const viewTemplates = () => {
        navigate('/templates')
    }

    const viewBlogs = () => {
        navigate('/blog')
    }

    return (
        <div style={{padding: 20}}>
            <div style={{display: 'flex', justifyContent: 'flex-end', padding: 10, background: '#f5f5f5', borderRadius: 20, marginBottom: 20, alignItems: 'center'}}>
                <div style={{width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 153, 255)', borderRadius: '100%', color: 'white', marginRight: 10}}>MM</div>
                <div style={{fontWeight: 'bold'}}>John Doe</div>
            </div>

        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{width: 200}}>
            <div>
                <h3><ArrowLeftOutlined style={{marginRight: 10, marginBottom: 20}} /> Menu</h3>

                <button style={{
                            background: 'rgba(61, 61, 61, 0.05)',
                            borderStyle: 'none',
                            padding: 10,
                            borderRadius: 28,
                            color: 'rgb(143, 230, 76)',
                            cursor: 'pointer',
                            width: 180,
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
                            width: 180,
                            marginRight: 20,
                            marginTop: 10,
                            fontWeight: 'bold'
                        }}>Coders Hub</button>
            </div>
            </div>
            <div style={{flex: 1}}>
                <div style={{width: '100%', background: "linear-gradient(105deg, #5c61ff 0%, hsl(214, 100%, 84%) 100%)", borderRadius: 20, padding: 30, overflow: 'hidden', position: 'relative'}}>
                    <span style={{color: 'white', fontSize: 64, fontWeight: 'bold', display: 'block'}}>Browse our<br />useful <span style={{color: 'rgb(143, 230, 76)'}}>Tutorials</span></span>
                    <div style={{width: 600}}>
                    <span style={{color: 'white'}}>Nunc quis tortor ut diam scelerisque volutpat ac ut felis. Nullam tincidunt lacinia eleifend. Vestibulum nisi augue, commodo sed tellus sed, condimentum lobortis orci. Aenean eu enim et arcu finibus facilisis nec vel orci.</span>
                    </div>
                    <img src='/images/ssss.webp' style={{
                        position: 'absolute',
                        right: -100,
                        top: 0,
                        bottom: 0
                    }} />
                </div>

                <div style={{marginTop: 20, background: '#f5f5f5', borderRadius: 20, border: '1px solid #dedede', padding: 15, marginBottom: 20}}>
                    <div style={{fontWeight: 'bold', fontSize: 20}}>Browse Tutorials</div>
                </div>

                <TutorialListing limit={6} />
            </div>
        </div>
        </div>
    )
}

export default HomeContent