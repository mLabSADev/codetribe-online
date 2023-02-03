import { LeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { navigate } from 'gatsby'
import React, { useEffect, useState } from 'react'
import PageLayout from './layout'

export default ({ data }) => {
    const webinar = data.markdownRemark
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <PageLayout active={'webinars'}>
            <div style={{
                background: '#efefef',
                borderRadius: 20,
                width: '100%',
                padding: 20
            }}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Button style={{
                        borderStyle: 'none',
                        background: '#dfdfdf',
                        width: 35,
                        height: 35,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 20,
                        borderRadius: '50%'
                    }} onClick={() => navigate(-1)}>
                        <LeftOutlined />
                    </Button>
                    <div style={{
                        textTransform: 'uppercase',
                        fontSize: '1.3em'
                    }}>{webinar.frontmatter.title}</div>
                </div>

                <div style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                    marginTop: 20
                }}>
                  <iframe width="100%" height={windowDimensions.width * 0.6} src={webinar.frontmatter.link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 20
                }}>
                    {(webinar.frontmatter.tags || []).map((tag, index) => {
                        return (
                            <div style={{
                                marginRight: 10,
                                background: '#dfdfdf',
                                borderRadius: 20,
                                padding: 8,
                                paddingLeft: 30,
                                paddingRight: 30
                            }} key={`tag-${index}`}>{tag}</div>
                        )
                    })}
                </div>

                <h2 style={{
                    marginTop: 20,
                    marginBottom: 20
                }}>{webinar.frontmatter.title}</h2>

                <div dangerouslySetInnerHTML={{__html: webinar.html}} />
            </div>
        </PageLayout>
    )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        author
        tags
        link
        featureImage {
            childImageSharp {
                sizes(maxWidth: 580) {
                    ...GatsbyImageSharpSizes_withWebp
                }
            }
        }
        date(formatString: "MMMM DD, YYYY")
        duration
      }
      fields {
          tutorial
      }
      timeToRead
    },
    allMarkdownRemark(filter: {fields: {type: {eq: "webinars"}}}) {
        edges {
            node {
                frontmatter {
                    title
                    chapter
                    lesson
                    duration
                    tags
                },
                fields {
                    slug
                    tutorial
                }
                timeToRead
            }
        }
    }
  }`
