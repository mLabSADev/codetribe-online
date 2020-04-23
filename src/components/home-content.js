import React from 'react'
import '../styles/home-content.css'
import { Button, Divider } from 'antd'
import { navigate } from 'gatsby'
import PostListing from './post-listing'

const HomeContent = () => {
    const getStarted = () => {
        navigate('/tutorials')
    }

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
        <div>
            <div id='home-header'>
                <h1>Learn how to build Android &amp; iOS Apps</h1>
                <p>Building apps is easier than you think. We will take you through the process of building your own apps using React and Firebase</p>
                <Button size='large' type='primary' onClick={getStarted}>Get Started</Button>
            </div>

            <div style={{paddingLeft: 40, paddingRight: 40, marginTop: 40, marginBottom: 40}}>
                <h3 className='section-header'>Recent Tutorials</h3>
                <PostListing type={'tutorials'} limit={4} />
                <div className='center-button'>
                    <Button size={'large'} onClick={viewTutorials}>View More</Button>
                </div>
                <Divider style={{background: '#dfdfdf'}} />
                
                <h3 className='section-header'>Recent Templates</h3>
                <PostListing type={'templates'} limit={4} />
                <div className='center-button'>
                    <Button size={'large'} onClick={viewTemplates}>View More</Button>
                </div>
                <Divider style={{background: '#dfdfdf'}} />

                <h3 className='section-header'>Recent Blogs</h3>
                <PostListing type={'blog'} limit={4} />
                <div className='center-button'>
                    <Button size={'large'} onClick={viewBlogs}>View More</Button>
                </div>
            </div>
            
        </div>
    )
}

export default HomeContent