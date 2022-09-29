import { Button } from 'antd'
import React from 'react'
import Img from "gatsby-image"
import { Link } from 'gatsby';

const WebinarCard = ({webinar, onClick}) => {
    console.log(webinar);

    return (
        <div style={{
            
            borderColor: 'grey',
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: 20,
        }}>
            <div style={{
                position: 'relative'
            }}>
                <Img alt={webinar.frontmatter.title} sizes={webinar.frontmatter.featureImage.childImageSharp.sizes} style={{
                    height: 300,
                    width: '100%',
                    background: 'black',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }} />
                <div style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    background: 'rgba(0,0,0,0.3)',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: 20
                }}>
                    {webinar.frontmatter.title}
                </div>
            </div>
            <div style={{
                padding: 20
            }}>
                <div style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
                    <div style={{fontWeight: 'bold', marginRight: 10}}>by {webinar.frontmatter.author}</div>
                    <div>{webinar.date}</div>
                    <div></div>
                </div>
                <div>
                    {webinar.excerpt}
                </div>
                <Link to={webinar.fields.slug}><Button style={{
                    background: '#82c803',
                    color: 'white',
                    borderRadius: 20,
                    fontWeight: 'bold',
                    borderStyle: 'none',
                    width: '100%',
                    marginTop: 10
                }}>Read More</Button>
                </Link>
            </div>
        </div>
    )
}

export default WebinarCard