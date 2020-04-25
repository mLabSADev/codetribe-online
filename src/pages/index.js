import React from "react"
import HomeContent from "../components/home-content"
import PageLayout from "../templates/page-layout"
import { HomeHeader } from "../components/home-header"
import SEO from "../components/seo"

export default () => (
    <div>
        <SEO title='Build React Web &amp; Mobile Apps' description='Building apps is easier than you think. We will take you through the process of building your own apps using React and Firebase' />
        <PageLayout fullscreen={true} active='home' header={<HomeHeader />}>
            <HomeContent />
        </PageLayout>
    </div>
)
