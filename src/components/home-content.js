import React from 'react'
import '../styles/home-content.css'
import { Button, Divider } from 'antd'
import { navigate } from 'gatsby'
import PostListing from './post-listing'

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
        <div>
            <div style={{marginBottom: 40}}>
                <h3 className='section-header'>Recent Tutorials</h3>
                <PostListing type={'tutorials'} limit={3} />
                <div className='center-button'>
                    <Button size={'large'} onClick={viewTutorials}>View More</Button>
                </div>
                <Divider />
                
                <h3 className='section-header'>Recent Templates</h3>
                <PostListing type={'templates'} limit={3} />
                <div className='center-button'>
                    <Button size={'large'} onClick={viewTemplates}>View More</Button>
                </div>
                <Divider />

                <h3 className='section-header'>Recent Blogs</h3>
                <PostListing type={'blog'} limit={3} />
                <div className='center-button'>
                    <Button size={'large'} onClick={viewBlogs}>View More</Button>
                </div>
            </div>
            
        </div>
    )
}

export default HomeContent