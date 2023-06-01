import PageLayout from '../templates/layout';
import { Button, Col, Form, Input, Modal, Row, Spin, Table, Upload, UploadFile } from 'antd';
import React, { useEffect, useState } from 'react'
import { CoursesService } from '../services/courses-service';
import { Link } from 'gatsby';
import { PlusOutlined } from '@ant-design/icons';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CreateEditCourse from '../modals/create-edit-course';

export default ({ params }) => {
    const [course, setCourse] = useState()
    const [columns, setColumns] = useState()
    const [lesson, setLesson] = useState()
    const { chapterId, lessonId, courseId } = params

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [fileList, setFileList] = useState([])

    const onSave = () => {
        const url = `https://www.googleapis.com/youtube/v3/videos?id=9bZkp7q19f0&part=contentDetails&key=AIzaSyCSvPQ3-fpuAYGljNEBCrWTVO-yO9tepaU`
    }

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    useEffect(() => {
        CoursesService.lesson(courseId, chapterId, lessonId).then(lesson => {
            console.log(lesson)
            setLesson(lesson)
        })
    }, [])

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    
        setPreviewImage(file.url || (file.preview));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
      };

    const onFinish = () => {

    }

    const onUploadChange = (newFileList) => {
        console.log(newFileList)
        setFileList(newFileList.fileList);
    }

    const uploadButton = (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

    return (
        <div>
            
            <PageLayout title='Lesson' active='courses'>
                <div>
                
                {(lessonId == null || lesson) && (<Form
                    name="basic"
                    layout='vertical'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ width: '100%' }}
                    onFinish={onFinish}
                    autoComplete="off"
                    initialValues={lesson ? {
                        title: lesson.title,
                        videoUrl: lesson.videoUrl
                    } : null}
                >
                    <div>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                    </div>
                    <div style={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 60
                    }}>
                    <Form.Item
                        label="Title"
                        name="title"
                        style={{width: '100%'}}
                        rules={[{ required: true, message: 'Please input the title' }]}
                        >
                        <Input style={{width: '100%'}} />
                    </Form.Item>
                    <Form.Item
                        label="Video URL"
                        name="videoUrl"
                        rules={[{ required: true, message: 'Please input video url' }]}
                        >
                        <Input />
                    </Form.Item>
                    </div>

                    {/* <ReactQuill modules={{
                        toolbar: [
                            [{ font: [] }],
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            ["bold", "italic", "underline", "strike"],
                            [{ color: [] }, { background: [] }],
                            [{ script:  "sub" }, { script:  "super" }],
                            ["blockquote", "code-block"],
                            [{ list:  "ordered" }, { list:  "bullet" }],
                            [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
                            ["link", "image", "video"],
                            ["clean"],
                        ]
                    }} value={lesson && lesson.body} theme="snow"/> */}
                    
                </Form>)}
                </div>
            </PageLayout>
        </div>
    )
}