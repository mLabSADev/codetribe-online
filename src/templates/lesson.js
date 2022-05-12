import React from 'react'
import SEO from '../components/seo'
import PageLayout from './page-layout'
import { Divider, Button, Row, Col, Collapse, Timeline, Slider } from 'antd'
import { ArrowRightOutlined, ArrowLeftOutlined, CheckCircleFilled } from '@ant-design/icons'
import { graphql, Link, navigate } from 'gatsby'
import Disqus from 'gatsby-plugin-disqus/components/Disqus'
import Quiz from '../components/quiz'

export const DurationHelper = {
    secondsToText: seconds => {
        let hours = Math.floor(seconds / (60 * 60))
        seconds = seconds - (hours * 60 * 60)

        let min = Math.floor(seconds / 60)
        seconds = seconds - (min * 60)

        if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ${min} min`
        } else {
            return `${min} min`
        }
    },
    timeFormatToText: time => {
        const [min, sec] = time.split(':')

        let total = 0
        total += (parseInt(min) * 60) + parseInt(sec)

        return DurationHelper.secondsToText(total)
    }
}

export default ({ data }) => {
    const post = data.markdownRemark
    const currentChapter = post.frontmatter.chapter
    const currentLesson = post.frontmatter.lesson
    const canGoBack = currentChapter > 0
    let totalDuration;
    let totalDurationUntilCurrentLesson = 0;
    let canGoForward
    let title
    let mainSlug

    console.log(post)

    const lessons = data.allMarkdownRemark.edges.map(edge => {
        return edge.node
    }).filter(lesson => lesson.fields.tutorial === post.fields.tutorial)

    let total = 0
    console.log(currentChapter);
    console.log(currentLesson);
    for (let lesson of lessons) {
        const [min, sec] = lesson.frontmatter.duration.split(':')

        total += (parseInt(min) * 60) + parseInt(sec)

        if (lesson.frontmatter.chapter < currentChapter) {
            totalDurationUntilCurrentLesson += (parseInt(min) * 60) + parseInt(sec)
        } else if (lesson.frontmatter.chapter == currentChapter && lesson.frontmatter.lesson < currentLesson) {
            totalDurationUntilCurrentLesson += (parseInt(min) * 60) + parseInt(sec)
        }
    }
    totalDuration = DurationHelper.secondsToText(total);

    const chapters = {}
    lessons.forEach(lesson => {
        if (lesson.frontmatter.lesson === 0 && lesson.frontmatter.chapter === 0) { 
            title = lesson.frontmatter.title
            mainSlug = lesson.fields.slug
        } else {
            if (chapters[lesson.frontmatter.chapter] === undefined) {
                chapters[lesson.frontmatter.chapter] = {
                    lessons: [],
                    timeToRead: 0
                }
            }

            if (lesson.frontmatter.lesson === 0) {
                chapters[lesson.frontmatter.chapter].title = lesson.frontmatter.title
    
                if (lesson.frontmatter.chapter === currentChapter) {
                    chapters[lesson.frontmatter.chapter].current = true
                } else {
                    chapters[lesson.frontmatter.chapter].current = false
                }
            } else {
                if (lesson.frontmatter.chapter < currentChapter) {
                    lesson.completed = true
                } else
                if (lesson.frontmatter.chapter === currentChapter && lesson.frontmatter.lesson < currentLesson) {
                    lesson.completed = true
                } else {
                    lesson.completed = false
                }
    
                if (lesson.frontmatter.chapter === currentChapter && lesson.frontmatter.lesson === currentLesson) {
                    lesson.current = true
                } else {
                    lesson.current = false
                }
    
                chapters[lesson.frontmatter.chapter].lessons[lesson.frontmatter.lesson] = lesson
                chapters[lesson.frontmatter.chapter].timeToRead += lesson.timeToRead
            }
        }
    })

    const lastChapter = Object.keys(chapters).length
    const lastLesson = chapters[lastChapter].lessons.length - 1
    canGoForward = (post.frontmatter.chapter < lastChapter || post.frontmatter.lesson < lastLesson)

    const goToPrev = () => {
        let prevLesson

        if (post.frontmatter.lesson === 1 && post.frontmatter.chapter === 1) {
            navigate(mainSlug)

            return
        } else if (post.frontmatter.lesson === 0) {
            prevLesson = chapters[post.frontmatter.chapter - 1].lessons[1]
        } else {
            prevLesson = chapters[post.frontmatter.chapter].lessons[post.frontmatter.lesson - 1]
        }

        navigate(prevLesson.fields.slug)
    }
    const goToNext = () => {
        let nextLesson
        if (post.frontmatter.chapter === 0) {
            nextLesson = chapters[1].lessons[1]
        }
        else if (post.frontmatter.lesson === chapters[post.frontmatter.chapter].lessons.length - 1) {
            nextLesson = chapters[post.frontmatter.chapter + 1].lessons[1]
        } else {
            nextLesson = chapters[post.frontmatter.chapter].lessons[post.frontmatter.lesson + 1]
        }

        navigate(nextLesson.fields.slug)
    }

    const progress = Math.round(totalDurationUntilCurrentLesson / total * 100)

    return (
        <>
            <SEO title={post.frontmatter.title} description={post.frontmatter.description} />
            <PageLayout active='tutorials' fullscreen={true} background='transparent' withPadding={false}>
                <Row>
                    <Col sm={0} md={1} />
                    <Col sm={24} md={22}>
                        <Row  gutter={16}>
                            {/* <Col span={2}></Col> */}
                            <Col xs={24} sm={24} md={8} lg={6}>
                                <div style={{background: 'white', width: '100%', marginRight: 10, marginBottom: 20}}>
                                    <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 20}}>
                                        <Link to={mainSlug}><h2 style={{color: '#97CA42', marginBottom: 0}}>{title}</h2><span style={{color: '#afafaf'}}>{totalDuration}</span></Link>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div style={{background: '#cfcfcf', flex: 1, height: 5}}>
                                                <div style={{background: '#97CA42', width: `${progress}%`, height: 5}} />
                                            </div>
                                            <div style={{paddingLeft: 10}}>{progress}%</div>
                                        </div>
                                    </div>
                                    
                                    <Collapse defaultActiveKey={[`${currentChapter}`]} bordered={false} expandIconPosition='right'>
                                        {Object.keys(chapters).map(key => {
                                            const chapter = chapters[key]

                                            console.log(chapter);
                                            let chapterTotalDuration = 0
                                            for (let chapterLesson of chapter.lessons) {
                                                if (!chapterLesson)
                                                    continue

                                                const [min, sec] = chapterLesson.frontmatter.duration.split(':')
                                        
                                                chapterTotalDuration += (parseInt(min) * 60) + parseInt(sec)
                                            }
                                            console.log(lessons);
                                            console.log(`Total seconds: ` + chapterTotalDuration);
                                            chapterTotalDuration = DurationHelper.secondsToText(chapterTotalDuration);

                                            return (
                                                <Collapse.Panel expandIconPosition='right' header={<div style={{color: chapter.current ? '#97CA42' : '#606060', fontWeight: chapter.current ? 'bold' : 'normal'}}>{`${key}. ${chapter.title} (${chapterTotalDuration})`}</div>} key={key} style={{background: 'white', borderColor: '#f0f2f5'}}>
                                                    <Timeline style={{marginLeft: 20, marginTop: 10}}>
                                                        {chapter.lessons.map((lesson, key) => {
                                                            

                                                            return (
                                                                <Timeline.Item color='#97CA42' key={key} dot={lesson.completed ? <CheckCircleFilled style={{color: 'green'}} /> : null}>
                                                                    <Link to={lesson.fields.slug} style={{color: lesson.current ? '#97CA42' : '#606060', fontWeight: lesson.current ? 'bold' : 'normal'}}>{lesson.frontmatter.title} ({DurationHelper.timeFormatToText(lesson.frontmatter.duration)})</Link>
                                                                </Timeline.Item>
                                                            )
                                                        })}
                                                    </Timeline>
                                                </Collapse.Panel>
                                            )
                                        })}
                                    </Collapse>
                                </div>
                            </Col>
                            <Col sm={24} md={16} lg={18}>
                            <div style={{background: 'white', paddingLeft: 40, paddingRight: 40, paddingTop:1, paddingBottom: 40}}>
                                    <h1 style={{marginBottom: 0}}>{post.frontmatter.title}</h1>
                                    
                                    {post.frontmatter.title !== 'Test your skills' ? (<div>
                                        {/* <p style={{color: '#97CA42', fontSize: '0.9em', marginBottom: 20}}>{post.timeToRead} min of reading</p> */}
                                        <div style={{fontSize: '1em'}} dangerouslySetInnerHTML={{ __html: post.html }} />

                                        <Divider />
                                        <div style={{display: 'flex', marginTop: 20}}>
                                            <Button onClick={goToPrev} disabled={!canGoBack} size='large' type='default' icon={<ArrowLeftOutlined />}>Previous</Button>
                                            <span style={{flex: 1}} />
                                            <Button onClick={goToNext} disabled={!canGoForward} size='large' type='default'>Next <ArrowRightOutlined /></Button>
                                        </div>

                                    </div>) : (
                                        <Quiz />
                                    )}

                                    <Divider />

                                    <div style={{padding: 40, paddingTop: 20}}>
                                        <Disqus  />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </PageLayout>
        </>
    )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        author
        chapter
        lesson
        date(formatString: "MMMM DD, YYYY")
        duration
      }
      fields {
          tutorial
      }
      timeToRead
    },
    allMarkdownRemark(filter: {fields: {type: {eq: "lessons"}}}) {
        edges {
            node {
                frontmatter {
                    title
                    chapter
                    lesson
                    duration
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