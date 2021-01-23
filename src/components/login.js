import { Alert, Button, Form, Input } from "antd"
import React, { useState } from "react"
import { AuthService } from "../services/auth-service"

const Login = ({
    onLoggedIn
}) => {
    const [loggingIn, setIsLoggingIn] = useState(false)
    const [errorMessage, setMessage] = useState(null)

    const onLogin = values => {
        setIsLoggingIn(true)
        setMessage(null)

        AuthService.login(values.email, values.password).then(() => {
            onLoggedIn()
        }).catch(err => {
            setMessage(err.message)
        }).finally(() => {
            setIsLoggingIn(false)
        })
    }

  return (
    <div>
      <Form layout="vertical" initialValues={{email: '', password: ''}} onFinish={onLogin}>
        {errorMessage && <Alert message={errorMessage} type="error" style={{marginBottom: 20}} />}
        <Form.Item label="Email" name='email' rules={[
            {
                required: true,
                message: 'Your email address is required'
            }
        ]}>
          <Input placeholder="Input your email address" style={{height: 50}} />
        </Form.Item>
        <Form.Item label="Password" name='password' rules={[
            {
                required: true,
                message: 'Your password is required'
            }
        ]}>
          <Input type='password' placeholder="Input your password" style={{height: 50}} />
        </Form.Item>
        <Form.Item>
            <Button loading={loggingIn} disabled={loggingIn} htmlType='submit' type="primary" style={{height: 50, width: 100}}>Sign In</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
