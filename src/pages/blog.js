import React from 'react'
import PageLayout from '../templates/page-layout'
import PostListing from '../components/post-listing'

export default () => (
    <div>
        <PageLayout title='Blog' active='blog'>
            <PostListing />
        </PageLayout>
    </div>
)
