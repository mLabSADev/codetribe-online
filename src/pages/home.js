import React, { useEffect, useState } from "react"
import HomeContent from "../components/home-content"
import PageLayout from "../templates/page-layout"
import { HomeHeader } from "../components/home-header"
import SEO from "../components/seo"
import { AuthService } from "../services/auth-service"
import { navigate } from "gatsby"

export default () => {
    const [loading, setLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        AuthService.isLoggedIn().then(result => {
            if (result) {
                setIsLoggedIn(true)
            }
        }).catch(err => {
            navigate('/')
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return loading ? (<div></div>) : (isLoggedIn ? (
        <div>
            <SEO title='Build React Web &amp; Mobile Apps' description='Building apps is easier than you think. We will take you through the process of building your own apps using React and Firebase' />
            {/* <PageLayout fullscreen={true} active='home'>
                
            </PageLayout> */}
            <HomeContent />
        </div>
    ) : <div></div>)
}
