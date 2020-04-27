import React from 'react'
import PageLayout from '../templates/page-layout'
import TutorialListing from '../components/tutorial-listing'

export default () => (
    <div>
        <PageLayout title='Tutorials' active='tutorials'>
            <TutorialListing />
        </PageLayout>
    </div>
)
