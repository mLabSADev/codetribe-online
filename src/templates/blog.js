import React from 'react'
import { graphql } from "gatsby"
import PageLayout from './page-layout'

export default ({ data }) => {
    const post = data.markdownRemark

    return (
        <div>
            <PageLayout title={post.frontmatter.title} active={post.fields.type}>
                <img alt={post.frontmatter.title} style={{
                    width: '100%',
                    marginBottom: 40
                }} src={post.frontmatter.featureImage.childImageSharp.original.src} />
                <div style={{fontSize: '1.2em'}} dangerouslySetInnerHTML={{ __html: post.html }} />
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
        featureImage {
            childImageSharp {
                original {
                    src
                }
            }
        }
      }
      fields {
          type
      }
    }
  }`