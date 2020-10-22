import React from 'react'
import PageLayout from '../templates/page-layout'

const Webinar = () => {
    return (
        <div>
            <PageLayout title='' active='webinar'>
                <iframe src="https://us04web.zoom.us/j/8718813399?pwd=emd5R3J2UXRRQlFwcldGeE1sREw3UT09" style={{width: "100%", height: "800px", border: "none"}}></iframe>
            </PageLayout>
        </div>
    )
}

export default Webinar