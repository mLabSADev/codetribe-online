import { Button, Col, Row, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { LessonService } from '../services/lesson-service';
import { StudentsService } from '../services/students-service';
import PageLayout from '../templates/page-layout'

const lessonNames = {
    react: 'ReactJS',
    ionic: 'Ionic',
    'react-native': 'React Native'
}

const ProgressCard = ({progress, data}) => {
    const position = progress.lesson
    const lessons = data.allMarkdownRemark.edges.map(edge => {
        return edge.node
    }).filter(lesson => lesson.fields.tutorial === progress.tutorial)
    let durationCount = 0
    let totalCount = 0
    let currentLesson
    let currentChapter

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

        if (lesson.frontmatter.chapter == position.chapter) {
            currentChapter = lesson.frontmatter.title
        }
        if (lesson.frontmatter.chapter == position.chapter && lesson.frontmatter.lesson == position.lesson) {
            currentLesson = lesson.frontmatter.title
        }
    }

    const progressPercentage = Math.round(durationCount / totalCount * 100)

    return (
        <div style={{
            padding: 20,
            background: 'white',
            margin: 10,
            borderRadius: 10,
            borderColor: '#dfdfdf',
            borderWidth: 1,
            borderStyle: 'solid'
        }}>
            {lessonNames[progress.tutorial]}
            <div style={{background: '#cfcfcf', flex: 1, height: 5}}>
                <div style={{background: '#97CA42', width: `${progressPercentage}%`, height: 5}} />
            </div>
            <div style={{marginBottom: 10}}>{isNaN(progressPercentage) ? '-' : progressPercentage}%</div>

            Currently working on:
            <div style={{fontWeight: 'bold', fontSize: 12, marginTop: 10}}>{currentChapter}</div><div style={{fontSize: 12}}>{currentLesson}</div>
        </div>
    )
}

const StudentInfo = ({student, data}) => {
    const [progress, setProgress] = useState(null)
    const tutorials = ['react', 'react-native', 'ionic']

    useEffect(() => {
        const promises = tutorials.map(tutorial => {
            return LessonService.currentLessonPositionForStudent(student.key, tutorial).then(lesson => {
                return {
                    tutorial,
                    lesson
                }
            })
        })

        Promise.all(promises).then(result => {
            console.log(result);
            setProgress(result)
        })
    })

    return (
        <div>
            <h3>{student.firstname}'s Progress</h3>
            <div style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                <Row>
                    {progress ? progress.map(lesson => {
                        return (
                            <Col xs={24} sm={24} md={12} lg={8}><ProgressCard student={student} progress={lesson} data={data} /></Col>
                        )
                    }) : <Spin />}
                </Row>
            </div>
        </div>
    )
}

export default ({ data }) => {
    const [students, setStudents] = useState()
    const [columns, setColumns] = useState()

    useEffect(() => {
        StudentsService.students().then(({students, groups}) => {

        setColumns([
            {
                title: 'First Name',
                dataIndex: 'firstname',
                key: 'firstname',
                sorter: (a, b) => a.firstname < b.firstname ? -1 : 1,
                
            //   filters: [{
            //     text: 'Joe',
            //     value: 'Joe',
            //   },],
                filterMode: 'tree',
                filterSearch: true,
                onFilter: (input, record) => record.firstname && record.firstname.toLowerCase() == input.toLowerCase()
            },
            {
                title: 'Last Name',
                dataIndex: 'lastname',
                key: 'lastname',
            //   sorter: (a, b) => a.lastname < b.lastname,
            },
            {
                title: 'Email Address',
                dataIndex: 'email',
                key: 'email',
                },
                {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
                },
            {
                title: 'ID Number',
                dataIndex: 'idNumber',
                key: 'idNumber',
            },
            {
                title: 'Location',
                dataIndex: 'location',
                key: 'location',
                filterMode: 'tree',
                filterSearch: true,
                filters: groups.map(filter => ({text: filter, value: filter})),
                onFilter: (value, record) => record.location && record.location.startsWith(value)
            }])

            setStudents(students)
        })
    }, [])

    return (
        <div>
            <PageLayout title='Students' active='students' topRight={<Button>Add Student</Button>}>
                {students && columns ? <Table dataSource={students} columns={columns} expandable={{
      expandedRowRender: record => <p style={{ margin: 0 }}>{<StudentInfo student={record} data={data} />}</p>,
      rowExpandable: () => true,
    }} /> : <div style={{display: 'flex', justifyContent: 'center'}}><Spin /></div>}
            </PageLayout>
        </div>
    )
}

export const query = graphql`
  query {
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