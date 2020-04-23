import React from "react"
import HomeContent from "../components/home-content"
import PageLayout from "../templates/page-layout"

export default () => (
    <div>
        <PageLayout fullscreen={true} active='home'>
            <HomeContent />
        </PageLayout>
    </div>
)
