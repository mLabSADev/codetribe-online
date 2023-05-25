import React, { useEffect, useState } from "react"
import "../styles/home-content.css"
import { Button, Col, Divider, Row, Typography } from "antd"
import { Link, navigate } from "gatsby"
import PostListing from "./post-listing"
import TutorialListing from "./tutorial-listing"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { AuthService } from "../services/auth-service"
import PageLayout from "../templates/layout"

const HomeContent = () => {
  const [user, setUser] = useState(null)

  const viewTutorials = () => {
    navigate("/tutorials")
  }

  const viewTemplates = () => {
    navigate("/templates")
  }

  const viewBlogs = () => {
    navigate("/blog")
  }

  const getInitials = user => {
    console.log(user)
    if (user) return user.firstname.substr(0, 1) + user.lastname.substr(0, 1)
    else return "-"
  }

  useEffect(() => {
    AuthService.currentUser().then(result => {
      console.log(result)
      setUser(result)
    })
  }, [])

  return (
    <PageLayout active={"browse"}>
      <div style={{ padding: 20 }}>
        {/* <div style={{display: 'flex', justifyContent: 'flex-end', padding: 10, background: '#f5f5f5', borderRadius: 20, marginBottom: 20, alignItems: 'center'}}>
                <div style={{flex: 1}}>
                {user && user.role === 'facilitator' && <Button type='link' onClick={() => {
                    navigate('/students')
                }}>View Students</Button>}
                </div>
                <div style={{width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 153, 255)', borderRadius: '100%', color: 'white', marginRight: 10}}>{getInitials(user)}</div>
                {user && <div style={{fontWeight: 'bold'}}>{user.firstname} {user.lastname}</div>}
            </div> */}

        {/* <div style={{display: 'flex', flexDirection: 'row'}}> */}

        <div style={{ flex: 1 }}>
          {/* <div
            style={{
              width: "100%",
              background:
                "linear-gradient(105deg, #5c61ff 0%, hsl(214, 100%, 84%) 100%)",
              borderRadius: 20,
              padding: 30,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Row>
              <Col xs={24} sm={24} md={16} lg={12}>
                <span
                  style={{
                    color: "white",
                    fontSize: 64,
                    fontWeight: "bold",
                    display: "block",
                  }}
                >
                  Browse our
                  <br />
                  useful{" "}
                  <span style={{ color: "rgb(143, 230, 76)" }}>Tutorials</span>
                </span>
                <div>
                  <span style={{ color: "white" }}>
                    Nunc quis tortor ut diam scelerisque volutpat ac ut felis.
                    Nullam tincidunt lacinia eleifend. Vestibulum nisi augue,
                    commodo sed tellus sed, condimentum lobortis orci. Aenean eu
                    enim et arcu finibus facilisis nec vel orci.
                  </span>
                </div>
              </Col>
              <Col xs={0} sm={0} md={0} lg={8}>
                <img src="/images/ssss.webp" style={{}} />
              </Col>
            </Row>
          </div> */}

          <div
            style={{
              marginTop: 20,
              borderRadius: 20,
              padding: 15,
              marginBottom: 20,
            }}
          >
            <Typography.Title>Browse Tutorials</Typography.Title>
          </div>

          <TutorialListing limit={6} />
        </div>
      </div>
    </PageLayout>
  )
}

export default HomeContent
