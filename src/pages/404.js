import React from 'react'
import PageLayout from '../templates/page-layout'
import { Empty } from 'antd'

export default () => (
    <div>
        <PageLayout>
            <div style={{marginTop: 100, paddingBottom: 100}}>
                <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description={
                    <>
                        <p style={{fontWeight: 100, fontSize: '3em', marginTop: 40}}>404</p>
                        <h1>Not Found</h1>
                        <p>The page you are looking for has either been moved or removed</p>
                    </>
                } />
            </div>
        </PageLayout>
    </div>
)
