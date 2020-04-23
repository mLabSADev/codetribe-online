import React from 'react'
import '../styles/home-content.css'
import { Button } from 'antd'
import { navigate } from 'gatsby'

const HomeContent = () => {
    const getStarted = () => {
        navigate('/tutorials')
    }

    return (
        <div id='home-header'>
            <h1>Learn how to build Android &amp; iOS Apps</h1>
            <p>Building apps is easier than you think. We will take you through the process of building your own apps using React and Firebase</p>
            <Button size='large' type='primary' onClick={getStarted}>Get Started</Button>
        </div>
    )
}

export default HomeContent