import React from 'react'
import { StaticQuery, graphql, navigate } from 'gatsby'
import { Card, Col, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import Img from "gatsby-image"


const PostListing = ({type, category, limit, onClick}) => {
    const PostCard = ({post}) => {
        const handleClick = () => {
            navigate(post.fields.slug)
        }

        return (
            <Card
                hoverable={true}
                onClick={handleClick}
                style={{width: '100%'}}
                cover={<Img alt={post.frontmatter.title} sizes={post.frontmatter.featureImage.childImageSharp.sizes} />}
            >
                <Meta title={post.frontmatter.title} description={<div style={{color: 'black'}}>{post.excerpt}</div>} />
            </Card>
        )
    }
    
    return (
        <StaticQuery 
            query={graphql`
                query PostsQuery {
                    allMarkdownRemark {
                        edges {
                            node {
                                frontmatter {
                                    title
                                    author
                                    featureImage {
                                        childImageSharp {
                                            sizes(maxWidth: 600) {
                                                ...GatsbyImageSharpSizes_withWebp
                                            }
                                        }
                                    }
                                    date
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
            render={({allMarkdownRemark}) => {
                let posts = allMarkdownRemark.edges.map(edge => edge.node).filter(post => !!post.frontmatter.featureImage)

                if (type) {
                    posts = posts.filter(post => post.fields.type === type)
                }

                if (category) {
                    posts = posts.filter(post => post.frontmatter.category === category)
                }

                if (limit) {
                    posts = posts.slice(0, limit)
                }

                return (
                    <div>
                        <Row>
                            
                            {posts.length > 0 && posts.map((post, index) => (
                                <Col key={index} sm={24} md={12} lg={12} xl={8} style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
                                    <PostCard post={post} onClick={onClick} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                )
            }}
        />
    )
}

export default PostListing