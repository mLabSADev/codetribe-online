import { Col, Row } from 'antd'
import { navigate, StaticQuery } from 'gatsby'
import React, { useState } from 'react'
import WebinarCard from './webinar-card'

const WebinarListing = ({category, limit, onCategories}) => {
    const [categoriesSent, setCategoriesSent] = useState(false)

    const onClick = webinar => {
        console.log(webinar.fields.slug);
        navigate(webinar.fields.slug)
    }

    return (
        <StaticQuery
            query={graphql`
                query WebinarsQuery {
                    allMarkdownRemark(filter: {fields: {type: {eq: "webinars"}}}) {
                        edges {
                            node {
                                frontmatter {
                                    title
                                    author
                                    featureImage {
                                        childImageSharp {
                                            sizes(maxWidth: 580) {
                                                ...GatsbyImageSharpSizes_withWebp
                                            }
                                        }
                                    }
                                    date
                                    tags
                                }
                                excerpt(format: PLAIN, truncate: true)
                                fields {
                                    type
                                    slug
                                }
                            }
                        }
                    }
                }
            `}
            render={(({allMarkdownRemark}) => {
                let webinars = allMarkdownRemark.edges.map(edge => edge.node)//.filter(post => !!post.frontmatter.featureImage)

                
                if (!categoriesSent) {
                    let categories = []
                    for (let webinar of webinars) {
                        categories =  categories.concat(webinar.frontmatter.tags)
                    }

                    onCategories([...new Set(categories)])
                    setCategoriesSent(true)
                    console.log(`Categories Sent`);
                }

                if (category) {
                    webinars = webinars.filter(webinar => {
                        const tags = (webinar.frontmatter.tags || [])
                            .map(webinar => webinar.toLowerCase())

                        return tags.indexOf(category.toLowerCase()) != -1
                    })
                }
                

                return (
                    <div>
                        <Row>
                            
                            {webinars.length > 0 && webinars.map((webinar, index) => (
                                <Col key={index} sm={24} md={12} lg={8} xl={6} style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
                                    <WebinarCard webinar={webinar} onClick={onClick} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                )
            })}
        />
    )
}

export default WebinarListing