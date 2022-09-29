import React from 'react'
import { StaticQuery, graphql, navigate, Link } from 'gatsby'
import { Card, Col, Row } from 'antd'
import Img from "gatsby-image"
import { BookFilled, HeartFilled } from '@ant-design/icons'


const TutorialListing = ({type, category, limit, onClick}) => {
    const PostCard = ({post}) => {
        const handleClick = () => {
            navigate(`/overview${post.fields.slug}`)
        }

        const share = () => {

        }

        return (
            <div style={{
                borderRadius: 10,
                overflow: 'hidden',
            }}>
                <Img alt={post.frontmatter.title} sizes={post.frontmatter.featureImage.childImageSharp.sizes} />
                <div style={{
                    padding: 20,
                    border: '1px solid #dedede',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <h2>{post.frontmatter.title}</h2>
                    <div style={{marginBottom: 20}}><span style={{background: '#f5f5f5', padding: 10, fontWeight: 'bold', borderRadius: 20, marginBottom: 10}}>By {post.frontmatter.author}</span></div>
                    <p style={{minHeight: 80}}>{post.excerpt}</p>
                    {/* <div style={{display: 'flex'}}>
                        <div style={{background: '#f5f5f5', padding: 10, fontWeight: 'bold', borderRadius: 20, marginRight: 10}}>{post.frontmatter.duration}</div>
                        <div style={{background: '#f5f5f5', padding: 10, fontWeight: 'bold', borderRadius: 20, marginRight: 10}}>5 Sections</div>
                        <div style={{background: '#f5f5f5', padding: 10, fontWeight: 'bold', borderRadius: 20, marginRight: 10}}>Web Development</div>
                    </div> */}
                    <div style={{display: 'flex', marginTop: 20}}>
                    <div style={{
                        flex: 1,
                        marginRight: 10
                    }}>
                        <button style={{
                            background: 'rgb(143, 230, 76)',
                            borderStyle: 'none',
                            padding: 10,
                            borderRadius: 28,
                            color: 'white',
                            cursor: 'pointer',
                            width: '100%',
                            height: 50
                        }} onClick={handleClick}>View Course</button>
                        
                        </div>
                        {/* <div style={{width: 50, height: 50, borderRadius: '100%', borderWidth: 1, borderColor: 'rgb(143, 230, 76)', borderStyle: 'solid', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <HeartFilled style={{fontSize: 20, color: 'rgb(143, 230, 76)'}} />
                        </div>
                        <div style={{marginLeft: 10, width: 50, height: 50, borderRadius: '100%', borderWidth: 1, borderColor: 'rgb(143, 230, 76)', borderStyle: 'solid', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <BookFilled style={{fontSize: 20, color: 'rgb(143, 230, 76)'}} />
                        </div> */}
                    </div>
                </div>
            </div>
        )

        // return (
        //     <Card
        //         hoverable={true}
        //         onClick={handleClick}
        //         style={{width: '100%', borderRadius: 20}}
        //         actions={[
        //             <div style={{fontWeight: 'normal'}}>{post.frontmatter.price === 0 ? 'Free' : `$${post.frontmatter.price}`}</div>,
        //             <div style={{fontWeight: 'normal'}}>{post.frontmatter.duration}</div>,
        //             <ShareAltOutlined onClick={share} />
        //         ]}
        //         cover={<Img alt={post.frontmatter.title} sizes={post.frontmatter.featureImage.childImageSharp.sizes} />}
        //     >
        //         <Meta title={post.frontmatter.title} description={<div style={{color: 'black'}}>{post.excerpt}</div>} />
        //     </Card>
        // )
    }
    
    return (
        <StaticQuery 
            query={graphql`
                query TutorialsQuery {
                    allMarkdownRemark(filter: {frontmatter: {chapter: {eq: 0}}}) {
                        edges {
                            node {
                                frontmatter {
                                    title
                                    author
                                    price
                                    featureImage {
                                        childImageSharp {
                                            sizes(maxWidth: 580) {
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

export default TutorialListing