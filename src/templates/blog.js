import React from 'react'
import { graphql } from "gatsby"
import PageLayout from './page-layout'
import Img from "gatsby-image"
import { Divider, Space } from 'antd'
import { UserOutlined, CalendarOutlined } from '@ant-design/icons'
import PostListing from '../components/post-listing'

export default ({ data }) => {
    const post = data.markdownRemark

    return (
        <div>
            <PageLayout active={post.fields.type} withPadding={false}>
                        <div style={{background: 'white'}}>
                            <Img alt={post.frontmatter.title} style={{
                                width: '100%',
                                marginBottom: 0
                            }} sizes={post.frontmatter.featureImage.childImageSharp.sizes} />

                            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', paddingLeft: 40, paddingRight: 40}}>
                                <h1 style={{textAlign: 'center'}}>{post.frontmatter.title}</h1>
                                <div>
                                    {/* <span style={{fontSize: '1.2em', textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
                                        
                                    </span> */}
                                    <Space size={20}>
                                        <span><CalendarOutlined style={{marginRight: 3}}/> {post.frontmatter.date}</span>
                                        {/* <Divider type='vertical' style={{width: 2}} /> */}
                                        <span><UserOutlined style={{marginRight: 8}}/>{post.frontmatter.author}</span>
                                    </Space>
                                </div>
                                <div style={{width: 200}}>
                                    <Divider style={{height: 2}} />
                                </div>
                                
                            </div>
                            <div style={{fontSize: '1.2em', paddingLeft: 40, paddingRight: 40, paddingBottom: 40}} dangerouslySetInnerHTML={{ __html: post.html }} />
                        </div>

                        <Divider style={{height: 40}} />

                        <div style={{background: 'white', paddingLeft: 40, paddingRight: 40, paddingTop: 20}}>
                            <h2>More Posts</h2>
                            <PostListing type='tutorials' limit={3} />
                        </div>

                
            </PageLayout>
        </div>
    )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        author
        date(formatString: "MMMM DD, YYYY")
        featureImage {
            childImageSharp {
                sizes(maxWidth: 1600) {
                    ...GatsbyImageSharpSizes
                }
            }
        }
      }
      fields {
          type
      }
    }
  }`