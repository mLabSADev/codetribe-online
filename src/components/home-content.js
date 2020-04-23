import React from 'react'
import '../styles/home-content.css'
import { Button } from 'antd'

const HomeContent = () => {
    return (
        <div id='home-header'>
            <h1>Learn how to build Android &amp; iOS Apps</h1>
            <p>Building apps is easier than you think. We will take you through the process of building your own apps using React and Firebase</p>
            <Button size='large' type='primary'>Get Started</Button>
        </div>
    )
}

export default HomeContent