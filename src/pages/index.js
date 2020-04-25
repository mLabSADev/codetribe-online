import React from "react"
import HomeContent from "../components/home-content"
import PageLayout from "../templates/page-layout"
import { HomeHeader } from "../components/home-header"

export default () => (
    <div>
        <PageLayout fullscreen={true} active='home' header={<HomeHeader />}>
            <HomeContent />
        </PageLayout>
    </div>
)
