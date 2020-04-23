import React from 'react'
import { StaticQuery, graphql, navigate } from 'gatsby'
import { Card, Col, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'

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
                cover={<img alt={post.frontmatter.title} src={post.frontmatter.featureImage.childImageSharp.resize.src} />}
            >
                <Meta title={post.frontmatter.title} description={post.excerpt} />
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
                                            resize(width: 600) {
                                                src
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

                console.log(posts)
                if (type) {
                    posts = posts.filter(post => post.fields.type === type)
                }

                if (category) {
                    posts = posts.filter(post => post.frontmatter.category === category)
                }

                if (limit) {
                    posts = posts.slice(0, limit)
                }

                console.log(posts)
                return (
                    <div>
                        <Row gutter={16}>
                            
                            {posts.length > 0 && posts.map((post, index) => (
                                <Col key={index} xs={24} sm={12} md={8} lg={6} style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
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