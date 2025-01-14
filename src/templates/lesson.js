import { Link, navigate } from "gatsby"
import { useEffect, useState } from "react"
import { LessonService } from "../services/lesson-service"
import React from "react"
import PageLayout from "./layout"
import SEO from "../components/seo"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded"
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Timeline,
} from "antd"
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  CheckOutlined,
  LeftOutlined,
} from "@ant-design/icons"
import Quiz from "../components/quiz"
import Disqus from "gatsby-plugin-disqus/components/Disqus"
import { IconButton, Stack, Typography } from "@mui/material"
import { AuthService } from "../services/auth-service"
import { Assessment } from "../services/admin-service"

export const DurationHelper = {
  secondsToText: seconds => {
    let hours = Math.floor(seconds / (60 * 60))
    seconds = seconds - hours * 60 * 60

    let min = Math.floor(seconds / 60)
    seconds = seconds - min * 60

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ${min} min`
    } else {
      return `${min} min`
    }
  },
  timeFormatToText: time => {
    const [min, sec] = time.split(":")

    let total = 0
    total += parseInt(min) * 60 + parseInt(sec)

    return DurationHelper.secondsToText(total)
  },
}

export default ({ data }) => {
  const post = data.markdownRemark
  let currentChapter = post.frontmatter.chapter
  let currentLesson = post.frontmatter.lesson
  const canGoBack = currentChapter > 0
  let totalDuration
  // let totalDurationUntilCurrentLesson = 0;
  let canGoForward
  let title
  let mainSlug
  const [position, setPosition] = useState()
  const [
    totalDurationUntilCurrentLesson,
    setTotalDurationUntilCurrentLesson,
  ] = useState(0)
  const [total, setTotal] = useState(0)
  const [nextIsLoading, setNextIsLoading] = useState(false)
  const [showAssessmentSubmission, setShowAssessmentSubmission] = useState(
    false
  )
  const [user, setUser] = useState({})
  const isLegalPage = lesson => {
    if (position) {
      let hasToMove = false
      if (
        lesson.frontmatter.chapter == position.chapter &&
        lesson.frontmatter.lesson > position.lesson
      ) {
        hasToMove = true
      } else if (lesson.frontmatter.chapter > position.chapter) {
        hasToMove = true
      }

      return !hasToMove
    }

    return false
  }

  useEffect(() => {
    // const parts = mainSlug.split('/')
    // const finalParts = []
    // for (let part of parts) {
    //     if (part.trim().length !== 0) {
    //         finalParts.push(part)
    //     }
    // }

    LessonService.currentLessonPosition(
      data.markdownRemark.fields.tutorial
    ).then(position => {
      setPosition(position)
      const lessons = data.allMarkdownRemark.edges
        .map(edge => {
          return edge.node
        })
        .filter(lesson => lesson.fields.tutorial === post.fields.tutorial)

      let hasToMove = false
      let lessonToMoveTo
      for (let lesson of lessons) {
        if (
          lesson.frontmatter.chapter == position.chapter &&
          lesson.frontmatter.lesson == position.lesson
        ) {
          lessonToMoveTo = lesson
        }
      }

      if (
        currentChapter == position.chapter &&
        currentLesson > position.lesson
      ) {
        hasToMove = true
      } else if (currentChapter > position.chapter) {
        hasToMove = true
      }

      let durationCount = 0
      let totalCount = 0
      for (let lesson of lessons) {
        const [min, sec] = lesson.frontmatter.duration.split(":")

        totalCount += parseInt(min) * 60 + parseInt(sec)

        if (lesson.frontmatter.chapter < position.chapter) {
          // setTotalDurationUntilCurrentLesson(totalDurationUntilCurrentLesson + (parseInt(min) * 60) + parseInt(sec))
          durationCount += parseInt(min) * 60 + parseInt(sec)
        } else if (
          lesson.frontmatter.chapter == position.chapter &&
          lesson.frontmatter.lesson < position.lesson
        ) {
          // setTotalDurationUntilCurrentLesson(totalDurationUntilCurrentLesson + (parseInt(min) * 60) + parseInt(sec))
          durationCount += parseInt(min) * 60 + parseInt(sec)
        }
      }
      setTotalDurationUntilCurrentLesson(durationCount)
      setTotal(totalCount)

      if (hasToMove || (currentChapter == 0 && currentLesson == 0)) {
        navigate(lessonToMoveTo.fields.slug)
      }
    })
  }, [])

  const lessons = data.allMarkdownRemark.edges
    .map(edge => {
      return edge.node
    })
    .filter(lesson => lesson.fields.tutorial === post.fields.tutorial)

  // for (let lesson of lessons) {
  //     const [min, sec] = lesson.frontmatter.duration.split(':')

  //     total += (parseInt(min) * 60) + parseInt(sec)

  //     // if (lesson.frontmatter.chapter < currentChapter) {
  //     //     totalDurationUntilCurrentLesson += (parseInt(min) * 60) + parseInt(sec)
  //     // } else if (lesson.frontmatter.chapter == currentChapter && lesson.frontmatter.lesson < currentLesson) {
  //     //     totalDurationUntilCurrentLesson += (parseInt(min) * 60) + parseInt(sec)
  //     // }
  // }

  // let total = 0

  // for (let lesson of lessons) {
  //     const [min, sec] = lesson.frontmatter.duration.split(':')

  //     total += (parseInt(min) * 60) + parseInt(sec)

  //     if (lesson.frontmatter.chapter < currentChapter) {
  //         totalDurationUntilCurrentLesson += (parseInt(min) * 60) + parseInt(sec)
  //     } else if (lesson.frontmatter.chapter == currentChapter && lesson.frontmatter.lesson < currentLesson) {
  //         totalDurationUntilCurrentLesson += (parseInt(min) * 60) + parseInt(sec)
  //     }
  // }
  totalDuration = DurationHelper.secondsToText(total)

  const chapters = {}
  lessons.forEach(lesson => {
    if (lesson.frontmatter.lesson === 0 && lesson.frontmatter.chapter === 0) {
      title = lesson.frontmatter.title
      mainSlug = lesson.fields.slug
    } else {
      if (chapters[lesson.frontmatter.chapter] === undefined) {
        chapters[lesson.frontmatter.chapter] = {
          lessons: [],
          timeToRead: 0,
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
        } else if (
          lesson.frontmatter.chapter === currentChapter &&
          lesson.frontmatter.lesson < currentLesson
        ) {
          lesson.completed = true
        } else {
          lesson.completed = false
        }

        if (
          lesson.frontmatter.chapter === currentChapter &&
          lesson.frontmatter.lesson === currentLesson
        ) {
          lesson.current = true
        } else {
          lesson.current = false
        }

        chapters[lesson.frontmatter.chapter].lessons[
          lesson.frontmatter.lesson
        ] = lesson
        chapters[lesson.frontmatter.chapter].timeToRead += lesson.timeToRead
      }
    }
  })

  const lastChapter = Object.keys(chapters).length
  const lastLesson = chapters[lastChapter].lessons.length - 1
  canGoForward =
    post.frontmatter.chapter < lastChapter ||
    post.frontmatter.lesson < lastLesson

  const goToPrev = () => {
    let prevLesson

    if (post.frontmatter.lesson === 1 && post.frontmatter.chapter === 1) {
      navigate(mainSlug)

      return
    } else if (post.frontmatter.lesson === 0) {
      prevLesson = chapters[post.frontmatter.chapter - 1].lessons[1]
    } else {
      prevLesson =
        chapters[post.frontmatter.chapter].lessons[post.frontmatter.lesson - 1]
    }

    navigate(prevLesson.fields.slug)
  }
  const goToNext = () => {
    let nextLesson
    if (post.frontmatter.chapter === 0) {
      nextLesson = chapters[1].lessons[1]
    } else if (
      post.frontmatter.lesson ===
      chapters[post.frontmatter.chapter].lessons.length - 1
    ) {
      nextLesson = chapters[post.frontmatter.chapter + 1].lessons[1]
    } else {
      nextLesson =
        chapters[post.frontmatter.chapter].lessons[post.frontmatter.lesson + 1]
    }

    setNextIsLoading(true)
    LessonService.currentLessonPosition(data.markdownRemark.fields.tutorial)
      .then(position => {
        let proceed = false
        if (nextLesson.frontmatter.chapter > position.chapter) {
          proceed = true
        }

        if (nextLesson.frontmatter.lesson > position.lesson) {
          proceed = true
        }

        if (proceed) {
          LessonService.setCurrentPosition(
            data.markdownRemark.fields.tutorial,
            nextLesson.frontmatter.chapter,
            nextLesson.frontmatter.lesson
          ).then(() => {
            navigate(nextLesson.fields.slug)
          })
        } else {
          navigate(nextLesson.fields.slug)
        }
      })
      .finally(() => {
        setNextIsLoading(false)
      })
  }

  const progress = Math.round((totalDurationUntilCurrentLesson / total) * 100)
  const onFinish = values => {
    console.log("Success ", values)
    const currentURL = window.location.href
    let splitter = currentURL.split("/")
    const submission = {
      location: "",
      chapter: splitter[5],
      course: splitter[4],
      fullName: "",
      ...values,
    }
    AuthService.currentUser().then(res => {
      setUser(res)
      submission.fullName = `${res.firstname} ${res.lastname}`
      if (res.location) {
        submission.location = res.location
      } else {
        submission.location = res.groups[0]
      }
      Assessment.submit(submission).then(res => {
        console.log("Submitted")
      })
    })
  }

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }
  useEffect(() => {}, [])

  return (
    <Stack position={"relative"}>
      <Modal
        footer={false}
        title={"Assessment Submission"}
        open={showAssessmentSubmission}
        onOk={() => setShowAssessmentSubmission(false)}
        onCancel={() => setShowAssessmentSubmission(false)}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          // wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Github URL"
            name="github"
            rules={[
              { required: true, message: "Link to Github Projet is required!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            label="Site URL"
            name="site"
            rules={[
              { required: false, message: "Please input your password!" },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <PageLayout
        active="browse"
        fullscreen={true}
        background="transparent"
        withPadding={false}
      >
        <Stack
          flex={1}
          p={2}
          spacing={2}
          direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
        >
          <Stack flex={1}>
            <Stack
              flex={1}
              sx={{
                background: "#efefef",
                borderRadius: 5,
              }}
              p={2}
            >
              <Stack
                position={"sticky"}
                spacing={2}
                direction={"row"}
                alignItems={"center"}
              >
                <IconButton onClick={() => navigate(-1)}>
                  <ArrowBackRoundedIcon />
                </IconButton>

                <Typography fontWeight={"bold"} variant="h6">
                  {post.frontmatter.title}
                </Typography>
              </Stack>

              {!post.frontmatter.quiz ? (
                <div>
                  {/* <p style={{color: '#97CA42', fontSize: '0.9em', marginBottom: 20}}>{post.timeToRead} min of reading</p> */}
                  <div
                    style={{
                      overflow: "hidden",
                      marginTop: 20,
                    }}
                    dangerouslySetInnerHTML={{ __html: post.html }}
                  />

                  <Divider />
                  <div style={{ display: "flex", marginTop: 20 }}>
                    <Button
                      onClick={goToPrev}
                      disabled={!canGoBack}
                      size="large"
                      type="default"
                      icon={<ArrowLeftOutlined />}
                    >
                      Previous
                    </Button>
                    <span style={{ flex: 1 }} />
                    <Button
                      onClick={goToNext}
                      disabled={!canGoForward}
                      size="large"
                      type="default"
                      loading={nextIsLoading}
                    >
                      Next <ArrowRightOutlined />
                    </Button>
                  </div>
                </div>
              ) : (
                <Quiz
                  onNext={goToNext}
                  chapter={currentChapter}
                  lessonId={data.markdownRemark.fields.tutorial}
                  quiz={post.frontmatter.quiz}
                />
              )}

              <div style={{ marginTop: 0 }}>
                <Row>
                  {post.frontmatter.overview?.map(overview => {
                    return (
                      <Col xs={24} sm={24} md={12}>
                        <div
                          style={{
                            background: "#dfdfdf",
                            borderRadius: 20,
                            padding: 20,
                            marginBottom: 20,
                            marginRight: 20,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <CheckOutlined
                            style={{
                              marginRight: 15,
                              color: "green",
                            }}
                          />
                          {overview}
                        </div>
                      </Col>
                    )
                  })}
                </Row>
              </div>

              <Divider />

              <div style={{ padding: 40, paddingTop: 20 }}>
                <Disqus />
              </div>
            </Stack>
          </Stack>
          <Stack
            sx={{
              background: "#efefef",
              maxHeight: `${96}vh`,
              overflowY: "auto",
              borderRadius: 5,
            }}
          >
            <Stack p={2}>
              <Typography variant="h5" fontWeight={"bold"}>
                Course Content
              </Typography>
              {/* <Link to={mainSlug}><h2 style={{color: '#97CA42', marginBottom: 0}}>{title}</h2><span style={{color: '#afafaf'}}>{totalDuration}</span></Link> */}
              {/* <div style={{display: 'flex', alignItems: 'center'}}>
                                            Progress
                                            <div style={{background: '#cfcfcf', flex: 1, height: 5, marginLeft: 30, borderRadius: 3, overflow: 'hidden'}}>
                                                <div style={{background: '#97CA42', width: `${progress}%`, height: 5}} />
                                            </div>
                                            <div style={{paddingLeft: 10}}>{isNaN(progress) ? '-' : progress}%</div>
                                        </div> */}
            </Stack>

            <Collapse
              style={{ background: "transparent" }}
              defaultActiveKey={[`${currentChapter}`]}
              bordered={false}
              expandIconPosition="right"
            >
              {Object.keys(chapters).map(key => {
                const chapter = chapters[key]
                const course = ""
                let chapterTotalDuration = 0
                for (let chapterLesson of chapter.lessons) {
                  if (!chapterLesson) continue

                  const [min, sec] = chapterLesson.frontmatter.duration.split(
                    ":"
                  )

                  chapterTotalDuration += parseInt(min) * 60 + parseInt(sec)
                }
                chapterTotalDuration = DurationHelper.secondsToText(
                  chapterTotalDuration
                )

                return (
                  <Collapse.Panel
                    expandIconPosition="right"
                    header={
                      <Stack>
                        <Typography
                          sx={{
                            color: chapter.current ? "#97CA42" : "#606060",
                          }}
                          variant="subtitle1"
                        >{`${chapter.title} (${chapterTotalDuration})`}</Typography>
                      </Stack>
                    }
                    key={key}
                    style={{
                      backgroundColor: "rgba(0,0,0,0)",
                      borderColor: "#f0f2f5",
                    }}
                  >
                    <Timeline style={{ marginLeft: 20, marginTop: 10 }}>
                      {chapter.lessons.map((lesson, key) => {
                        return (
                          <Timeline.Item
                            style={{ backgroundColor: "rgba(0,0,0,0)" }}
                            key={key}
                            dot={
                              <Stack>
                                {isLegalPage(lesson) ? (
                                  <CheckBoxIcon color="success" />
                                ) : (
                                  <CheckBoxOutlineBlankIcon color="success" />
                                )}
                              </Stack>
                            }
                          >
                            {/* <Link style={{color: lesson.current ? '#97CA42' : '#606060', fontWeight: lesson.current ? 'bold' : 'normal'}}>{lesson.frontmatter.title} ({DurationHelper.timeFormatToText(lesson.frontmatter.duration)})</Link> */}
                            <Link
                              to={
                                isLegalPage(lesson)
                                  ? lesson.fields.slug
                                  : undefined
                              }
                              style={{
                                color: "#606060",
                                fontWeight: lesson.current ? "bold" : "normal",
                              }}
                            >
                              {lesson.frontmatter.title} (
                              {DurationHelper.timeFormatToText(
                                lesson.frontmatter.duration
                              )}
                              )
                            </Link>
                          </Timeline.Item>
                        )
                      })}
                    </Timeline>
                    {/* Student assessment submission */}
                    <Stack spacing={2}>
                      <Typography variant="subtitle1">
                        Complete Assessment
                      </Typography>
                      <Button
                        onClick={() => {
                          setShowAssessmentSubmission(true)
                        }}
                      >
                        Submit Assessment
                      </Button>
                    </Stack>
                    <Divider />
                  </Collapse.Panel>
                )
              })}
            </Collapse>
          </Stack>
        </Stack>
      </PageLayout>
    </Stack>
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
    }
    allMarkdownRemark(filter: { fields: { type: { eq: "lessons" } } }) {
      edges {
        node {
          frontmatter {
            title
            chapter
            lesson
            duration
          }
          fields {
            slug
            tutorial
          }
          timeToRead
        }
      }
    }
  }
`
