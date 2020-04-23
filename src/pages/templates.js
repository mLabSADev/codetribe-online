import React from 'react'
import PageLayout from '../templates/page-layout'
import PostListing from '../components/post-listing'

export default () => (
    <div>
        <PageLayout title='Templates' active='templates'>
            <PostListing type={'templates'} />
        </PageLayout>
    </div>
)
