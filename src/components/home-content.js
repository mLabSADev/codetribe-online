import React, { useEffect, useState } from "react"
import "../styles/home-content.css"
import { Button, Col, Divider, Row, Typography, Carousel } from "antd"
import { Link, navigate } from "gatsby"
import PostListing from "./post-listing"
import TutorialListing from "./tutorial-listing"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { AuthService } from "../services/auth-service"
import PageLayout from "../templates/layout"
import { Avatar, Stack } from "@mui/material"
import StudentProgress from "./progress"
import ResourceCards, { BackendCard } from "./resources"
// Dummy data ====
const ProgressData = [
  {
    progress: 100,
    course: "NodeJS",
    lesson: 4,
    section: "Create Page Login and Signup",
    duration: "4min",
    link: "",
  },
  {
    progress: 84,
    course: "ReactJS",
    lesson: 2,
    section: "Create Page Login and Signup",
    duration: "4min",
    link: "",
  },
  {
    progress: 0,
    course: "React Native",
    lesson: 1,
    section: "Create Page Login and Signup",
    duration: "4min",
    link: "",
  },
]
const FrontEndResourceData = [
  {
    image: "/images/resources/IONIC.jpg",
    title: "Ionic UI Components",
    description:
      "Ionic apps are made of high-level building blocks called Components, which allow you to quickly construct the UI for your app. Ionic comes stock with a number of components, including cards, lists, and tabs.",
    links: [
      {
        label: "Layout",
        link:
          "https://ionicframework.com/docs/core-concepts/cross-platform#layout",
      },
      {
        label: "Typography",
        link: "https://ionicframework.com/docs/api/text",
      },
      {
        label: "Button",
        link: "https://ionicframework.com/docs/api/button",
      },
      {
        label: "Inputs",
        link: "https://ionicframework.com/docs/api/input",
      },
      {
        label: "Theming Basics",
        link: "https://ionicframework.com/docs/theming/basics",
      },
    ],
  },
  {
    image: "/images/resources/MUI.jpg",
    title: "MUI for ReactJS",
    description:
      "MUI offers a comprehensive suite of UI tools to help you ship new features faster. Start with Material UI, our fully-loaded component library, or bring your own design system to our production-ready components.",
    links: [
      {
        label: "Layout",
        link: "https://mui.com/material-ui/react-stack/",
      },
      {
        label: "Typography",
        link: "https://mui.com/material-ui/react-typography/",
      },
      {
        label: "Button",
        link: "https://mui.com/material-ui/react-button/",
      },
      {
        label: "Inputs",
        link: "https://mui.com/material-ui/react-text-field/",
      },
      {
        label: "Theming",
        link: "https://mui.com/material-ui/customization/theming/",
      },
    ],
  },
  {
    image: "/images/resources/ANTD.jpg",
    title: "Ant Design",
    description:
      "Help designers/developers building beautiful products more flexible and working with happiness",
    links: [
      {
        label: "Design Values",
        link: "https://ant.design/docs/spec/values",
      },
      {
        label: "ColorPicker",
        link: "https://ant.design/components/color-picker",
      },
      {
        label: "QRCode",
        link: "https://ant.design/components/qrcode",
      },
      {
        label: "Tour",
        link: "https://ant.design/components/tour",
      },
      {
        label: "ConfigProvider",
        link: "https://ant.design/components/config-provider",
      },
    ],
  },
]
const BackendResourceData = [
  {
    icon: "/images/resources/REDUX.png",
    title: "Redux Toolkit",
    color: "#593D88",
    description:
      "The official, opinionated, batteries-included toolset for efficient Redux development",
    link: "https://redux-toolkit.js.org/tutorials/quick-start",
  },
  {
    icon: "/images/resources/FIREBASE.png",
    title: "Firebase",
    color: "#039BE5",
    description:
      "Firebase is an app development platform that helps you build and grow apps and games users love. Backed by Google and trusted by millions of businesses around the world.",
    link: "https://firebase.google.com/docs/build?authuser=0&hl=en",
  },
]
// End dummy data ====
function stringToColor(string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  }
}
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
      {/* Profile */}
      <Stack py={5} spacing={2} alignItems={"center"}>
        <Avatar
          sx={{ width: 56, height: 56 }}
          {...stringAvatar(
            `${user?.firstname || "C"} ${user?.lastname || "T"}`
          )}
        />
        <Typography.Title style={{ fontSize: 28, margin: 0 }}>
          {user?.firstname} {user?.lastname}
        </Typography.Title>
        {/* <Typography>
          {user.role && user.role.toUpperCase() || `${user?.name}@mail.com`}
        </Typography> */}
      </Stack>
      <Stack p={1}>
        <div>
          <div style={{ flex: 1 }}>
            {/* Courses */}
            <div
              style={{
                marginTop: 0,
                borderRadius: 20,
                // marginBottom: 20,
              }}
            >
              <Divider orientation="left">Your Progress</Divider>
              {/* <Stack p={2}>
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: 23,
                  }}
                >
                  Your Progress
                </Typography>
              </Stack> */}
              <Stack
                spacing={1}
                gap={1}
                sx={{ overflowX: "auto" }}
                direction={{ xs: "column", sm: "row", md: "row" }}
              >
                {ProgressData.map((item, i) => {
                  return (
                    <StudentProgress
                      link={
                        "https://codetribe.mlab.co.za/lessons/react/lesson-three/introduction/"
                      }
                      locked={item.course === "React Native"}
                      key={i}
                      lesson={item.lesson}
                      course={item.course}
                      title={item.section}
                      progress={item.progress}
                    />
                  )
                })}
              </Stack>
              <Divider />
              <Stack p={2}>
                <Typography.Title>Browse Tutorials</Typography.Title>
              </Stack>
            </div>

            <TutorialListing limit={6} />

            {/* Resources */}
            <Stack py={10} spacing={3}>
              <Stack alignItems={"center"}>
                <Typography.Title>Resources</Typography.Title>
              </Stack>
              <Stack
                width={"100%"}
                sx={{ overflowX: "auto" }}
                direction={{ sm: "column", md: "column", lg: "row" }}
                spacing={1}
                gap={1}
              >
                {/*  */}
                {FrontEndResourceData.map((item, i) => {
                  return (
                    <ResourceCards
                      key={i}
                      title={item.title}
                      description={item.description}
                      links={item.links}
                      image={item.image}
                    />
                  )
                })}
              </Stack>
              <Stack
                direction={{ sm: "column", md: "column", lg: "row" }}
                spacing={1}
                gap={1}
              >
                {BackendResourceData.map((item, i) => {
                  return (
                    <BackendCard
                      key={i}
                      link={item.link}
                      color={item.color}
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                    />
                  )
                })}
              </Stack>
            </Stack>
          </div>
        </div>
      </Stack>
    </PageLayout>
  )
}

export default HomeContent
