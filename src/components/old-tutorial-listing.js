import React from "react"
import { StaticQuery, graphql, navigate } from "gatsby"
import { Card, Col, Row } from "antd"
import Meta from "antd/lib/card/Meta"
import Img from "gatsby-image"
import { ShareAltOutlined } from "@ant-design/icons"

const TutorialListing = ({ type, category, limit, onClick }) => {
  const PostCard = ({ post }) => {
    const handleClick = () => {
      navigate(post.fields.slug)
    }

    const share = () => {}

    return (
      <Card
        hoverable={true}
        onClick={handleClick}
        style={{ width: "100%" }}
        actions={[
          <div style={{ fontWeight: "normal" }}>
            {post.frontmatter.price === 0
              ? "Free"
              : `$${post.frontmatter.price}`}
          </div>,
          <div style={{ fontWeight: "normal" }}>
            {post.frontmatter.duration}
          </div>,
          <ShareAltOutlined onClick={share} />,
        ]}
        cover={
          <Img
            alt={post.frontmatter.title}
            sizes={post.frontmatter.featureImage.childImageSharp.sizes}
          />
        }
      >
        <Meta
          title={post.frontmatter.title}
          description={<div style={{ color: "black" }}>{post.excerpt}</div>}
        />
      </Card>
    )
  }

  return (
    <StaticQuery
      query={graphql`
        query OldTutorialsQuery {
          allMarkdownRemark(filter: { frontmatter: { chapter: { eq: 0 } } }) {
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
      render={({ allMarkdownRemark }) => {
        let posts = allMarkdownRemark.edges
          .map(edge => edge.node)
          .filter(post => !!post.frontmatter.featureImage)

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
              {posts.length > 0 &&
                posts.map((post, index) => (
                  <Col
                    key={index}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={8}
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingBottom: 10,
                    }}
                  >
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
