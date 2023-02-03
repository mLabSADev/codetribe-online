import React, { useEffect, useState } from 'react'
import { CheckCircleFilled, CheckCircleOutlined, CheckOutlined, LeftOutlined } from '@ant-design/icons'
import { Button, Col, Collapse, Row, Timeline } from 'antd'
import { Link, navigate } from 'gatsby'
import PageLayout from "./layout"
import { LessonService } from '../services/lesson-service'

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

const CourseOverview = ({data}) => {
    const post = data.markdownRemark
    let currentChapter = post.frontmatter.chapter
    let currentLesson = post.frontmatter.lesson
    const canGoBack = currentChapter > 0
    let totalDuration;
    // let totalDurationUntilCurrentLesson = 0;
    let canGoForward
    let title
    let mainSlug
    const [position, setPosition] = useState()
    const [totalDurationUntilCurrentLesson, setTotalDurationUntilCurrentLesson] = useState(0)
    const [total, setTotal] = useState(0)
    const [nextIsLoading, setNextIsLoading] = useState(false) 

    const isLegalPage = (lesson) => {
        if (position) {
            let hasToMove = false
            if (lesson.frontmatter.chapter == position.chapter && lesson.frontmatter.lesson > position.lesson) {
                hasToMove = true
            } else if (lesson.frontmatter.chapter > position.chapter) {
                hasToMove = true
            }
    
            return !hasToMove
        }
        
        return false
    }

    useEffect(() => {
        LessonService.currentLessonPosition(data.markdownRemark.fields.tutorial).then(position => {
            setPosition(position)
            const lessons = data.allMarkdownRemark.edges.map(edge => {
                return edge.node
            }).filter(lesson => lesson.fields.tutorial === post.fields.tutorial)

            let hasToMove = false
            let lessonToMoveTo
            for (let lesson of lessons) {
                if (lesson.frontmatter.chapter == position.chapter && lesson.frontmatter.lesson == position.lesson) {
                    lessonToMoveTo = lesson
                }
            }

            if (currentChapter == position.chapter && currentLesson > position.lesson) {
                hasToMove = true
            } else if (currentChapter > position.chapter) {
                hasToMove = true
            }

            let durationCount = 0
            let totalCount = 0
            for (let lesson of lessons) {
                const [min, sec] = lesson.frontmatter.duration.split(':')
        
                totalCount += (parseInt(min) * 60) + parseInt(sec)
        
                if (lesson.frontmatter.chapter < position.chapter) {
                    // setTotalDurationUntilCurrentLesson(totalDurationUntilCurrentLesson + (parseInt(min) * 60) + parseInt(sec))
                    durationCount += (parseInt(min) * 60) + parseInt(sec)
                } else if (lesson.frontmatter.chapter == position.chapter && lesson.frontmatter.lesson < position.lesson) {
                    // setTotalDurationUntilCurrentLesson(totalDurationUntilCurrentLesson + (parseInt(min) * 60) + parseInt(sec))
                    durationCount += (parseInt(min) * 60) + parseInt(sec)
                }
            }
            setTotalDurationUntilCurrentLesson(durationCount)
            setTotal(totalCount)
        })
    }, [])

    const lessons = data.allMarkdownRemark.edges.map(edge => {
        return edge.node
    }).filter(lesson => lesson.fields.tutorial === post.fields.tutorial)

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

    const progress = Math.round(totalDurationUntilCurrentLesson / total * 100)

    return (<PageLayout active={'browse'}>
        <Row>
            <Col xs={24} sm={24} md={24} lg={24}>
            <div style={{
                    background: '#efefef',
                    borderRadius: 20,
                    width: '100%',
                    padding: 20,
                    marginBottom: 20,
                    paddingLeft: 50,
                    paddingRight: 50
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
                        }}>{post.frontmatter.title}</div>
                    </div>

                    <div style={{
                        overflow: 'hidden',
                        marginTop: 20
                    }} dangerouslySetInnerHTML={{__html: post.html}}>
                        
                    </div>

                    <div style={{marginTop: 20}}>
                        <Row>
                            {post.frontmatter.overview.map(overview => {
                                return (
                                    <Col xs={24} sm={24} md={12}>
                                        <div style={{
                                            background: '#dfdfdf',
                                            borderRadius: 20,
                                            padding: 20,
                                            marginBottom: 20,
                                            marginRight: 20,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <CheckOutlined style={{
                                                marginRight: 15,
                                                color: 'green'
                                            }} />
                                            {overview}
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                </div>
            </Col>
            <Col  xs={24} sm={24} md={24} lg={24}>
                        <div style={{background: '#efefef', width: '100%', maxWidth: '100%', marginBottom: 20, borderRadius: 20}}>
                                    <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 20}}>
                                        <h2 style={{fontWeight: 'bold'}}>Course Content</h2>
                                        {/* <Link to={mainSlug}><h2 style={{color: '#97CA42', marginBottom: 0}}>{title}</h2><span style={{color: '#afafaf'}}>{totalDuration}</span></Link> */}
                                        {/* <div style={{display: 'flex', alignItems: 'center'}}>
                                            Progress
                                            <div style={{background: '#cfcfcf', flex: 1, height: 5, marginLeft: 30, borderRadius: 3, overflow: 'hidden'}}>
                                                <div style={{background: '#97CA42', width: `${progress}%`, height: 5}} />
                                            </div>
                                            <div style={{paddingLeft: 10}}>{isNaN(progress) ? '-' : progress}%</div>
                                        </div> */}
                                    </div>
                                    
                                    <Collapse style={{background: 'transparent'}} defaultActiveKey={[`${currentChapter}`]} bordered={false} expandIconPosition='right'>
                                        {Object.keys(chapters).map(key => {
                                            const chapter = chapters[key]

                                            let chapterTotalDuration = 0
                                            for (let chapterLesson of chapter.lessons) {
                                                if (!chapterLesson)
                                                    continue

                                                const [min, sec] = chapterLesson.frontmatter.duration.split(':')
                                        
                                                chapterTotalDuration += (parseInt(min) * 60) + parseInt(sec)
                                            }
                                            chapterTotalDuration = DurationHelper.secondsToText(chapterTotalDuration);

                                            return (
                                                <Collapse.Panel expandIconPosition='right' header={<div style={{color: chapter.current ? '#97CA42' : '#606060', fontSize: '1.5em', fontWeight: 'bold'}}>{`${chapter.title} (${chapterTotalDuration})`}</div>} key={key} style={{background: 'transparent', borderColor: '#f0f2f5'}}>
                                                    <Timeline style={{marginLeft: 20, marginTop: 10}}>
                                                        {chapter.lessons.map((lesson, key) => {
                                                            

                                                            return (
                                                                <Timeline.Item style={{background: 'transparent'}} key={key} dot={
                                                                    <div style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        background: isLegalPage(lesson) ? '#97CA42' : '#dfdfdf',
                                                                        padding: 2,
                                                                        borderRadius: 5,
                                                                    }}>
                                                                        {<CheckOutlined style={{color: isLegalPage(lesson) ? 'white' : '#dfdfdf', background: 'transparent'}} />}
                                                                    </div>
                                                                }>
                                                                    {/* <Link style={{color: lesson.current ? '#97CA42' : '#606060', fontWeight: lesson.current ? 'bold' : 'normal'}}>{lesson.frontmatter.title} ({DurationHelper.timeFormatToText(lesson.frontmatter.duration)})</Link> */}
                                                                    <Link style={{color: '#606060', fontWeight: lesson.current ? 'bold' : 'normal'}}>{lesson.frontmatter.title} ({DurationHelper.timeFormatToText(lesson.frontmatter.duration)})</Link>

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
            </Row>
    </PageLayout>)
}

export default CourseOverview

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug2: { eq: $slug } }) {
      html
      frontmatter {
        title
        author
        chapter
        lesson
        date(formatString: "MMMM DD, YYYY")
        duration
        overview
        quiz {
            answerSelectionType
            answers
            correctAnswer
            messageForIncorrectAnswer
            messageForCorrectAnswer
            point
            question
            questionType
        }
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