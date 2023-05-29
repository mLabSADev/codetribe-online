import PageLayout from '../templates/layout';
import { Button, Col, Row, Space, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { CoursesService } from '../services/courses-service';
import { Link } from 'gatsby';

export default () => {
    const [courses, setCourses] = useState()
    const [columns, setColumns] = useState()

    useEffect(() => {
        CoursesService.courses().then(courses => {
            setCourses(courses)
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
                title: 'Description',
                dataIndex: 'excerpt',
                key: 'excerpt',
            },
            {
                title: 'Author',
                dataIndex: 'author',
                key: 'author',
            },
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => (
                  <Space size="middle">
                    <Link to={`/course/${record.key}`}>View</Link>
                    <a>Edit</a>
                    <a>Remove</a>
                  </Space>
                ),
              },])
    }, [])

    return (
        <div>
            <PageLayout title='Courses' active='courses' topRight={<Button>Add Course</Button>}>
            <h2 style={{marginBottom: 20}}>Courses</h2>
                {courses && columns ? <Table dataSource={courses} columns={columns} /> : <div style={{display: 'flex', justifyContent: 'center'}}><Spin /></div>}
            </PageLayout>
        </div>
    )
}