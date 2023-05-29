import React, { useState } from "react"
import PageLayout from "../templates/page-layout"
import { Form, Input, Button, Row, Col, Alert } from "antd"
import { Link } from "gatsby"
import { AuthService } from "../services/auth-service"

export default () => {
  const [loggingIn, setIsLoggingIn] = useState(false)
  const [errorMessage, setMessage] = useState(null)

  const onLogin = values => {
    setIsLoggingIn(true)
    setMessage(null)

    AuthService.login(values.email, values.password)
      .then(() => {
        onLoggedIn()
      })
      .catch(err => {
        setMessage(err.message)
      })
      .finally(() => {
        setIsLoggingIn(false)
      })
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const onLoggedIn = () => {}

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(227deg, #fffedb 0%, hsl(283, 100%, 88%) 100%)",
      }}
    >
      <Row style={{ height: "100%" }}>
        <Col xs={0} sm={0} md={0} lg={16}>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 0,
            }}
          >
            <img
              src="/images/login-illustration.png"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                opacity: 0.5,
              }}
            />
            <div
              style={{
                width: 600,
                zIndex: 10000,
              }}
            >
              <p
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontFamily: `"K2D", serif`,
                }}
              >
                Learn how to build
                <br />
                Android &amp; iOS
                <br />
                Apps
              </p>
              <p
                style={{
                  fontFamily: `"Julius Sans One", sans-serif`,
                  color: "#3d3d3d",
                  fontSize: 16,
                }}
              >
                Welcome to Codetribe Coding Academy!
              </p>
              <p>
                We are excited that you have managed to join the team. Your
                hardwork and dedication has been recognized. We have an amazing
                team that is willing to train, guide and mentor you on your
                journey.
              </p>
            </div>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={8}
          style={{ height: "100%", padding: 20 }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <img src="/images/codetribe.svg" />
            <h1>SIGN IN</h1>
            <Form
              layout="vertical"
              initialValues={{ email: "", password: "" }}
              onFinish={onLogin}
            >
              {errorMessage && (
                <Alert
                  message={errorMessage}
                  type="error"
                  style={{ marginBottom: 20 }}
                />
              )}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Your email address is required",
                  },
                ]}
              >
                <Input
                  placeholder="Input your email address"
                  style={{ height: 50 }}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Your password is required",
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Input your password"
                  style={{ height: 50 }}
                />
              </Form.Item>
              <Form.Item>
                {/* <Button loading={loggingIn} disabled={loggingIn} htmlType='submit' type="primary" style={{height: 50, width: 100}}>Sign In</Button>
            <Button htmlType='button' type="ghost" style={{height: 50, width: 100}}>Forgot Password</Button> */}
              </Form.Item>
            </Form>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 20,
                width: "85%",
              }}
            >
              <div
                style={{
                  flex: 1,
                }}
              >
                <button
                  style={{
                    background: "rgba(61, 61, 61, 0.05)",
                    borderStyle: "none",
                    padding: 10,
                    borderRadius: 28,
                    color: "rgb(61, 61, 61)",
                    cursor: "pointer",
                    width: "100%",
                    marginRight: 10,
                  }}
                >
                  Forgot Password
                </button>
              </div>
              <div
                style={{
                  flex: 1,
                }}
              >
                <Link to="/">
                  <button
                    style={{
                      background: "rgb(143, 230, 76)",
                      borderStyle: "none",
                      padding: 10,
                      borderRadius: 28,
                      color: "white",
                      cursor: "pointer",
                      width: "100%",
                      marginLeft: 10,
                    }}
                  >
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
