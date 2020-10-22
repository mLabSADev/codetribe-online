import React from 'react'
import '../styles/home-content.css'
import { Button } from 'antd'
import { navigate } from 'gatsby'

export const HomeHeader = () => {
    const getStarted = () => {
        navigate('/tutorials')
    }
    
    return (
        <div id='home-header'>
            <h1>Learn how to build Android &amp; iOS Apps</h1>
            <h2>Welcome to <span style={{fontWeight: 'bold'}}><span style={{color: "#97CA42"}}>code</span><span style={{color: "#9397A1"}}>tribe</span></span></h2>
            <p>Building apps is easier than you think. We will take you through the process of building your own apps using Ionic and Firebase</p>
            <Button size='large' type='primary' onClick={getStarted}>Get Started</Button>
        </div>
    )
}