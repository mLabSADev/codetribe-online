import React, { useState } from 'react'
import PageLayout from '../templates/page-layout'
import { Form, Input, Button, Row, Col, Alert } from 'antd'
import { Link, navigate } from 'gatsby';
import { AuthService } from '../services/auth-service';

const ForgotPassword = ({email, onCancel}) => {
    const [resettingPassword, setResettingPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [success, setSuccess] = useState()

    const forgotPassword = ({email}) => {
        setResettingPassword(true)

        return AuthService.forgotPassword(email).then(() => {
            setSuccess(true)
        }).catch(err => {
            setErrorMessage(err.message)
        }).finally(() => {
            setResettingPassword(false)
        })
    }

    return (
        <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
        }}>
            <Row style={{width: '100%'}}>
                <Col xs={0} sm={0} md={4} lg={6} />
                <Col xs={24} sm={24} md={16} lg={9} style={{padding: 20}}>
                    <div style={{ padding: 20, width: '100%',  borderRadius: 15, background: 'white'}}>
                        <h2 style={{textAlign: 'center'}}>Reset Password</h2>
                        <p style={{textAlign: 'center'}}>Input your email address below. You will receive an email with further instructions</p>
                        <Form layout="vertical" initialValues={{email: email ? email : ''}} onFinish={forgotPassword}>
                        {errorMessage && <Alert message={errorMessage} type="error" style={{marginBottom: 20}} />}
                        {success && <Alert message={'A password reset link has been sent to your email'} type="success" style={{marginBottom: 20}} />}
                    <Form.Item style={{}} label="Email" name='email' rules={[
            {
                required: true,
                message: 'Your email address is required'
            }
        ]}>
                        <Input placeholder="Email Address" style={{height: 50,
                                borderRadius: 10,
                                borderColor: 'rgb(143, 230, 76)',
                                borderStyle: 'solid',
                                padding: 10,
                                borderWidth: 2}} />
                    </Form.Item>
                    <Button size='large' loading={resettingPassword} disabled={resettingPassword} htmlType='submit' style={{
                            background: 'rgb(143, 230, 76)',
                            borderStyle: 'none',
                            borderRadius: 28,
                            color: 'white',
                            cursor: 'pointer',
                            width: '100%'
                        }}>Reset Password</Button>
                    <button type='button' disabled={resettingPassword} onClick={onCancel} style={{
                            background: 'rgba(61, 61, 61, 0.05)',
                            borderStyle: 'none',
                            padding: 10,
                            borderRadius: 28,
                            color: 'rgb(61, 61, 61)',
                            cursor: 'pointer',
                            width: '100%',
                            marginTop: 10
                        }}>Nevermind</button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default () => {
    const [loggingIn, setIsLoggingIn] = useState(false)
    const [errorMessage, setMessage] = useState(null)
    const [showForgotPassword, setShowForgotPassword] = useState(false)

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

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };

    const onLoggedIn = () => {
        navigate('/home')
    }

    const onForgotPassword = () => {
        setShowForgotPassword(true)
    }

    const onCloseForgotPassword = () => {
        setShowForgotPassword(false)
    }

    return (
        <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(227deg, #fffedb 0%, hsl(283, 100%, 88%) 100%)'
        }}>
            <Row style={{height: '100%', overflow: 'hidden'}}>
                <Col xs={0} sm={0} md={0} lg={16}>
            <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: 0,
                overflow: 'hidden'
            }}>
                <img src='/images/Frame.png' style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    opacity: 0.5
                }} />
                <div style={{
                    width: 600,
                    zIndex: 100
                }}>
                    <p style={{
                        fontSize: 40,
                        fontWeight: 700,
                        fontStyle: 'normal',
                        fontFamily: `"K2D", serif`
                    }}>Learn how to build<br />Android &amp; iOS<br />Apps</p>
                    <p style={{
                        fontFamily: `"Julius Sans One", sans-serif`,
                        color: '#3d3d3d',
                        fontSize: 16
                    }}>Welcome to Codetribe Coding Academy!</p>
                    <p>We are excited that you have managed to join the team. Your hardwork and dedication has been recognized. We have an amazing team that is willing to train, guide and mentor you on your journey.</p>
                </div>
            </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} style={{height: '100%', padding: 20}}>
            <div style={{
                background: 'white',
                borderRadius: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100%',
            }}>
                <img src='/images/mlab.png' style={{height: 40}} />
                <h1>SIGN IN</h1>
                <Form style={{width: '90%'}} layout="vertical" initialValues={{email: '', password: ''}} onFinish={onLogin}>
        {errorMessage && <Alert message={errorMessage} type="error" style={{marginBottom: 20}} />}
        <Form.Item style={{}} label="Email" name='email' rules={[
            {
                required: true,
                message: 'Your email address is required'
            }
        ]}>
          <Input placeholder="Input your email address" style={{height: 50,
                    borderRadius: 10,
                    borderColor: 'rgb(143, 230, 76)',
                    borderStyle: 'solid',
                    padding: 10,
                    borderWidth: 2}} />
        </Form.Item>
        <Form.Item label="Password" name='password' rules={[
            {
                required: true,
                message: 'Your password is required'
            }
        ]}>
          <Input type='password' placeholder="Input your password" style={{height: 50,
                    borderRadius: 10,
                    borderColor: 'rgb(143, 230, 76)',
                    borderStyle: 'solid',
                    borderWidth: 2,
                    padding: 10,
                    marginBottom: 20}} />
        </Form.Item>
        {/* <Form.Item>
            <Button loading={loggingIn} disabled={loggingIn} htmlType='submit' type="primary" style={{height: 50, width: 100}}>Sign In</Button>
        </Form.Item> */}

<Row style={{width: '100%'}}>
                        <Col xs={24} sm={12} style={{
                            paddingLeft: 5,
                            paddingRight: 5,
                            marginBottom: 10
                        }}>
                        <button type='button' onClick={onForgotPassword} style={{
                            background: 'rgba(61, 61, 61, 0.05)',
                            borderStyle: 'none',
                            padding: 10,
                            borderRadius: 28,
                            color: 'rgb(61, 61, 61)',
                            cursor: 'pointer',
                            width: '100%'
                            
                        }}>Forgot Password</button>
                        </Col>
                        <Col xs={24} sm={12} style={{
                            paddingLeft: 5,
                            paddingRight: 5,
                            marginBottom: 10
                        }}>
                        <Button size='large' loading={loggingIn} disabled={loggingIn} htmlType='submit' style={{
                            background: 'rgb(143, 230, 76)',
                            borderStyle: 'none',
                            borderRadius: 28,
                            color: 'white',
                            cursor: 'pointer',
                            width: '100%',
                            
                        }}>Sign In</Button>
                        </Col>
                    </Row>
      </Form>

                
            </div>
            </Col>
            </Row>

            {showForgotPassword && <ForgotPassword onCancel={onCloseForgotPassword} />}
        </div>
    )
}
