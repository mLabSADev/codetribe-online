import React from 'react'
import PageLayout from '../templates/page-layout'
import { Form, Input, Button } from 'antd'

export default () => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };

    return (
        <div>
            <PageLayout title='Contact Us' active='contact'>
                <Form {...layout} initialValues={{name: '', email: '', message: ''}} method="POST" name='contact' netlify data-netlify-recaptcha="true">
                    <Form.Item name='name' rules={[{required: true, message: 'Please input your name'}]}>
                        <Input placeholder='Name' />
                    </Form.Item>
                    <Form.Item name='email' rules={[{required: true, message: 'Please input your email address'}, {type: 'email', message: 'Please input a valid email address'}]}>
                        <Input placeholder='Email' />
                    </Form.Item>
                    <Form.Item name='message' rules={[{required: true, message: 'Please input your message'}]}>
                        <Input.TextArea style={{height: 100}} placeholder='Message' type='text' />
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' type='primary' htmlType='submit'>
                            Send
                        </Button>
                    </Form.Item>
                </Form>
            </PageLayout>
        </div>
    )
}
