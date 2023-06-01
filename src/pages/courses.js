import PageLayout from '../templates/layout';
import { Button, Col, Row, Space, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { CoursesService } from '../services/courses-service';
import { Link } from 'gatsby';
import CreateEditCourse from '../modals/create-edit-course';

export default () => {
    const [courses, setCourses] = useState()
    const [columns, setColumns] = useState()
    const [showCreateEditCourse, setShowCreateEditCourse] = useState({
        show: false,
        selectedCourse: null
    })

    useEffect(() => {
        CoursesService.courses().then(courses => {
            setCourses(courses)
        })

        setColumns([
            {
                title: 'Image',
                key: 'imageUrl',
                render: (_, record) => {
                    return <img src={record.imageUrl} alt={record.title} style={{
                        width: 150
                    }} />
                }
            },
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
                    <a onClick={() => setShowCreateEditCourse({
                        show: true,
                        selectedCourse: record
                    })}>Edit</a>
                    <a>Remove</a>
                  </Space>
                ),
              },])
    }, [])

    const onClose = () => {
        setShowCreateEditCourse({
            show: false,
            selectedCourse: null
        })

        setCourses(null)
        CoursesService.courses().then(courses => {
            setCourses(courses)
        })
    }

    return (
        <div>
            <div>
            {showCreateEditCourse.show && <CreateEditCourse course={showCreateEditCourse.selectedCourse} onCancel={onClose} />}
            <PageLayout title='Courses' active='courses' topRight={<Button>Add Course</Button>}>
            <Space size={'middle'} style={{
                alignItems: 'center', marginTop: 60,  marginBottom: 20
            }}>
                <h2 style={{marginTop: 10}}>Courses</h2>
                <Button onClick={() => {
                    setShowCreateEditCourse({
                        show: true
                    })
                }}>Add Course</Button>
            </Space>
                {courses && columns ? <Table dataSource={courses} columns={columns} /> : <div style={{display: 'flex', justifyContent: 'center'}}><Spin /></div>}
            </PageLayout>
            </div>
        </div>
    )
}