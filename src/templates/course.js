import PageLayout from '../templates/layout';
import { Button, Col, Row, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { CoursesService } from '../services/courses-service';
import { Link } from 'gatsby';

const Lessons = ({ course, chapter }) => {
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.firstname < b.firstname ? -1 : 1,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (input, record) => record.title && record.title.toLowerCase() == input.toLowerCase()
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration'
        },
        {
            title: 'Actions',
            render: (_, record) => {
                return <Link to={`/editor/${course}/chapter/${chapter.key}/lesson/${record.key}`}>Edit</Link>
            },
        }
    ]
    
    return (
        <Table dataSource={chapter.lessons} columns={columns}>

        </Table>
    )
}

export default ({ params }) => {
    const [course, setCourse] = useState()
    const [columns, setColumns] = useState()
    const { id } = params

    useEffect(() => {
        CoursesService.course(id).then(course => {
            setCourse(course)

            console.log(course)
        })

        setColumns([
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                sorter: (a, b) => a.firstname < b.firstname ? -1 : 1,
                filterMode: 'tree',
                filterSearch: true,
                onFilter: (input, record) => record.title && record.title.toLowerCase() == input.toLowerCase()
            },
            {
                title: 'Lessons',
                render: (_, record) => {
                    return <a>{record.lessons.length} Lesson{record.lessons.length == 1 ? '' : 's'}</a>
                },
            }])
    }, [])

    return (
        <div>
            <PageLayout title='Courses' active='courses' topRight={<Button>Add Chapter</Button>}>
            <h2 style={{marginBottom: 20}}>Course - {course && course.title}</h2>
                {course && columns ? <Table dataSource={course.chapters} columns={columns} expandable={{
                    expandedRowRender: record => <Lessons course={id} chapter={record} />,
                    rowExpandable: () => true
                }} /> : <div style={{display: 'flex', justifyContent: 'center'}}><Spin /></div>}
            </PageLayout>
        </div>
    )
}