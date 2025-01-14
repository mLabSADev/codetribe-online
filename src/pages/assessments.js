import React, { useEffect, useState } from "react"
import PageLayout from "../templates/layout"
import {
  Stack,
  Typography,
  Divider,
  Snackbar,
  AppBar,
  Box,
} from "@mui/material"
import {
  Button,
  Space,
  Table,
  Tag,
  Modal,
  List,
  Card,
  Cascader,
  Tabs,
  Avatar,
  Collapse,
  Statistic,
  Input,
  Select,
  Form,
  Checkbox,
  Alert,
  Popconfirm,
} from "antd"
import {
  CheckSquareOutlined,
  EllipsisOutlined,
  EditOutlined,
  SettingOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons"
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert"
import CircleIcon from "@mui/icons-material/Circle"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertFromRaw } from "draft-js"

import { Assessment } from "../services/admin-service"
import { AuthService } from "../services/auth-service"
import { CoursesService } from "../services/courses-service"
const { Column, ColumnGroup } = Table
const { Meta } = Card
// Dummy Data
const COURSES = ["nodejs", "ionic", "angular", "react", "react-native"]
const SUBMISSION = [
  {
    course: "react",
    group: "soweto",
    period: "June - Nov, 2023",
    submissions: [
      {
        student: "Jane Doe",
        projectLink: "https://www.gihutb.com/janedoe/todoapp",
      },
    ],
  },
]
const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
]
const items = [
  {
    key: "1",
    label: `Thembisa`,
  },
  {
    key: "2",
    label: `Soweto`,
  },
]
const submissions = [
  {
    course: "",
    lesson: "",
    location: "Thembisa",
    subs: [],
  },
]
// End Dummy data
function Assessments() {
  const [openModal, setOpenModal] = React.useState(false)
  const [openEval, setEval] = React.useState(false)
  const [criteria, setCriteria] = React.useState([])
  const [updating, setUpdating] = React.useState(false)
  const [assessmentUpdateId, setAssessmentUpdateId] = React.useState("")
  const [assessments, setAssessments] = React.useState([])
  const [courseLessons, setCourseLessons] = React.useState([]) // Options for Cascader
  const [adminLocations, setAdminLocations] = React.useState([])
  const [showSubs, setShowSubs] = React.useState({
    show: false,
    course: {},
  })
  const [submissions, setSubmissions] = React.useState([])
  const [user, setUser] = React.useState({})
  const [courseInfo, setCourseInfo] = React.useState({
    course: "",
    chapter: "",
  })
  const [totalStudents, setTotalStudents] = React.useState(0)
  const [updateEditorState, setUpdateEditorState] = React.useState(
    EditorState.createEmpty()
  )
  const [assessmentUpdatecontent, setAssessmentUpdateContent] = React.useState(
    {}
  )
  const [assessmentDetails, setAssessmentDetails] = React.useState({
    show: false,
    data: [],
    title: "",
    course: "",
  })
  const [form] = Form.useForm()
  const [alert, setAlert] = React.useState({
    show: false,
    message: "",
    severity: "", // error || warning || info || success
  })
  const showModal = () => {
    setOpenModal(true)
  }
  // Generates options for Cascader
  const onCourseChange = course => {
    let structure = {
      value: "",
      label: "",
      children: [],
    }
    const lessons = []
    // Course
    if (course != undefined) {
      CoursesService.course(course).then(res => {
        // Chapter
        console.log("Chapter >> ", res.chapters)
        res.chapters.forEach(chapter => {
          // Lesson
          console.log("Lesson >> ", chapter.lessons)
          structure.value = chapter.title
          structure.label = chapter.title

          // chapter.lessons.forEach(lesson => {
          //   structure.children.push({
          //     value: lesson.title,
          //     label: lesson.title,
          //   })
          // })
          lessons.push(structure)
          structure = {
            value: "",
            label: "",
            children: [],
          }
        })
        setCourseLessons(lessons)
      })
    }
  }

  // Form Modal State
  const handleOk = () => {
    setOpenModal(false)
  }
  const handleCancel = () => {
    setOpenModal(false)
  }
  // End Form modal

  const getAssessments = () => {
    Assessment.getAll().then(res => {
      setAssessments(res)
    })
  }
  const getStudentsByLocation = location => {
    let number = 0
    AuthService.getUserByLocation(location).then(res => {
      for (const [key, value] of Object.entries(res)) {
        number++
      }
      setTotalStudents(number)
    })
  }
  // Handles form submit
  const onFinish = async values => {
    console.log("Success:", values)
    let name = await AuthService.currentUser().then(res => res.firstname)
    if (updating) {
      Assessment.update(values.course, assessmentUpdateId, values)
        .then(async res => {
          setAlert({ message: "Assessment Updated", show: true })
          setOpenModal(false)
          setUpdating(false)
          form.resetFields()
          getAssessments()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      Assessment.add({ ...values, createdby: name })
        .then(async res => {
          setAlert({ message: "Assessment Added", show: true })
          setOpenModal(false)
          setUpdating(false)
          form.resetFields()
          getAssessments()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  // Handles form submit error
  const onFinishFailed = errorInfo => {
    // TODO: give a more detailed error
    setAlert({ message: "An error occured", show: true })
  }

  const onCascaderChange = value => {
    form.setFieldValue("lesson", value)
  }
  const onTabsChange = data => {
    let location = adminLocations[data - 1].label
    setTotalStudents(0)
    getStudentsByLocation(location)
    getSubmissions(location)
  }
  const getSubmissions = (locaton, course) => {
    if (courseInfo.course) {
      Assessment.getSubmissions({
        location: locaton,
        course: courseInfo.course,
      }).then(res => {
        console.log(res.val())
        if (res.val()) {
          for (const [key, value] of Object.entries(res.val())) {
            console.log({ ...value, key: key })
            setSubmissions(prev => [...prev, { ...value, key: key }])
          }
        } else {
          setSubmissions([])
        }
      })
    }
  }
  useEffect(() => {
    getAssessments()
    const students = []
    const student = {
      location: "",
      students: [],
      total: 0,
    }
    // Get current Admin
    AuthService.currentUser().then(res => {
      setUser(res)
      // Loop over locations
      res.groups.forEach((element, i) => {
        setAdminLocations(prev => [...prev, { key: i + 1, label: element }])
        getStudentsByLocation(element)
      })
    })
  }, [])
  return (
    <PageLayout>
      {/*Assessment Form Modal */}
      <Modal
        title={updating ? "Update Assessment" : "New Assessment"}
        // style={{ width: "80%" }}
        open={openModal}
        footer={false}
        okButtonProps={{ disabled: true }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* Form */}
        <Form
          form={form}
          name="assessment"
          labelCol={{ span: 5 }}
          // wrapperCol={{ span: 8 }}
          // style={{ width: 900 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          {/* Inputs */}
          <Form.Item name="course" label="Course" rules={[{ required: true }]}>
            <Select onChange={onCourseChange} allowClear>
              {COURSES.map(item => (
                <Select.Option value={item}>{item.toUpperCase()}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="lesson" label="Lesson" rules={[{ required: true }]}>
            {/* TODO: Component not behaving as expected */}
            {/* Using form does not fill this field's value */}
            <Cascader options={courseLessons} onChange={onCascaderChange} />
          </Form.Item>

          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input assessment title" },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          {/* New Assessment */}
          {updating && (
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: "Please add content" }]}
            >
              {/* TODO: Component not working as expected */}
              {/* Adding "editorState" disables the editablility of this input */}
              <Editor
                name="content"
                editorState={updateEditorState}
                readOnly={false}
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                }}
                placeholder="Type here"
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
              />
            </Form.Item>
          )}
          {/* Update Assessment */}

          {!updating && (
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: "Please add content" }]}
            >
              <Editor
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: false },
                  link: { inDropdown: true },
                  history: { inDropdown: false },
                }}
                name="content"
                placeholder="Type here"
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
              />
            </Form.Item>
          )}
          {/* Buttons */}
          <Form.Item wrapperCol={{ offset: 0, span: 0 }}>
            {updating ? (
              <Button
                size="large"
                type="primary"
                style={{ width: "100%" }}
                htmlType="submit"
              >
                Update
              </Button>
            ) : (
              <Button
                size="large"
                type="primary"
                style={{ width: "100%" }}
                htmlType="submit"
              >
                Submit
              </Button>
            )}
            <Button
              size="large"
              type="ghost"
              style={{ width: "100%", marginTop: 5 }}
              onClick={() => {
                form.resetFields()
                setUpdateEditorState(EditorState.createEmpty())
              }}
            >
              Clear
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* End form Modal */}

      {/* Details Modal */}
      <Modal
        title={"Assessment Content"}
        style={{ width: "80%" }}
        open={assessmentDetails.show}
        footer={false}
        // okButtonProps={{ disabled: true }}
        onOk={() => setAssessmentDetails({ ...assessmentDetails, show: false })}
        onCancel={() =>
          setAssessmentDetails({ ...assessmentDetails, show: false })
        }
      >
        <Stack spacing={2}>
          <Stack>
            <Typography variant="h5">{assessmentDetails.title}</Typography>
          </Stack>

          <Stack>
            {assessmentDetails.show && (
              <Editor
                editorState={EditorState.createWithContent(
                  convertFromRaw(assessmentDetails?.data || {})
                )}
                toolbarHidden
                readOnly
              />
            )}
          </Stack>
        </Stack>
      </Modal>
      {/* End Details Modal */}

      {/* Submissions Modal */}
      <Modal
        title={"Assessment Submissions"}
        style={{ width: "80%" }}
        open={showSubs.show}
        footer={false}
        // okButtonProps={{ disabled: true }}
        onOk={() => setShowSubs(false)}
        onCancel={() => setShowSubs(false)}
      >
        <Stack spacing={2}>
          <Stack>
            <Typography variant="h6">
              {courseInfo.course.toUpperCase()}
            </Typography>
            <Typography variant="subtitle1">{courseInfo.chapter}</Typography>
          </Stack>
          <Divider />
          <Tabs
            defaultActiveKey="1"
            items={adminLocations}
            onChange={onTabsChange}
          />
          <Statistic
            title="Student Submissions"
            value={submissions.length}
            suffix={`/${totalStudents}`}
          />
          <Divider />
          <List
            size="large"
            header={
              <Stack>
                <Input.Search placeholder="Search..."></Input.Search>
              </Stack>
            }
            // footer={<div>Footer</div>}
            bordered
            dataSource={submissions}
            renderItem={item => (
              <List.Item>
                <Stack flex={1} spacing={2}>
                  <Stack direction={"row"} alignItems={"center"} flex={1}>
                    <Stack flex={1}>
                      <Typography variant="subtitle1">
                        {item.fullName}
                      </Typography>
                      <Typography variant="caption" color={"GrayText"}>
                        Submitted - {new Date(item.submitted).toDateString()}
                      </Typography>
                    </Stack>
                    <Stack spacing={1} direction={{ sm: "column", md: "row" }}>
                      <Button href={item.github} target="_blank" type="link">
                        View Github
                      </Button>
                      {/* <Button type="text">View Live</Button> */}
                    </Stack>
                  </Stack>{" "}
                  {/* <Collapse size="small">
                    <Collapse.Panel header={"Credentials"}>
                      <Stack>
                        <Typography variant="caption">
                          Email: janedoe@mail.com
                        </Typography>
                        <Typography variant="caption">
                          Password: kj3423kjnr
                        </Typography>
                      </Stack>
                    </Collapse.Panel>
                  </Collapse> */}
                </Stack>
              </List.Item>
            )}
          />
        </Stack>
      </Modal>
      {/* End submissions Modal */}
      <Stack p={2} direction={"row"} spacing={1}>
        <Box sx={{ width: { xs: 20, sm: 15, md: 100, lg: 100 } }}></Box>
        <Typography variant="h5">Assessments</Typography>
        <Button
          onClick={() => {
            showModal(true)
            setUpdating(false)
            form.resetFields()
          }}
        >
          New Assessment
        </Button>
      </Stack>
      {/* Empty list state */}
      {assessments.length === 0 ? (
        <Stack spacing={2} alignItems={"center"} p={2}>
          <CrisisAlertIcon sx={{ fontSize: 90 }} />
          <Typography variant="h5">No Assessments</Typography>
          <Typography variant="body1" color={"GrayText"}>
            Your Assessments will be displayed here
          </Typography>
          <Button
            type="primary"
            onClick={() => {
              showModal(true)
              setUpdating(false)
              form.resetFields()
            }}
          >
            New Assessment
          </Button>
        </Stack>
      ) : null}
      {/* End empty list state */}

      {/* Assessments */}
      <Stack pt={5}>
        <Collapse
          style={{ borderRadius: 15, overflow: "hidden" }}
          defaultActiveKey={["0"]}
        >
          {assessments.map((course, i) => {
            let list = [] // Compensating for the "-NXQR23Owma8MCvBYNm0" keys...
            let keys = [] // store keys for delete & update
            for (const [key, value] of Object.entries(course)) {
              keys.push(key)
              if (key !== "key") {
                list.push({
                  content: course[key].content,
                  lesson: course[key].lesson,
                  title: course[key].title,
                })
              }
            }

            // Collapsable
            return (
              <Collapse.Panel key={i} header={course.key.toUpperCase()}>
                {/* Total Counter */}
                <Stack
                  direction={"row"}
                  spacing={1}
                  gap={1}
                  alignItems={"center"}
                >
                  <Stack>
                    <Statistic
                      title="Total Assessments"
                      value={list.length}
                      precision={0}
                    />
                  </Stack>
                </Stack>
                <Divider />

                {/* Search */}
                <Stack
                  py={2}
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                >
                  <Input.Search
                    placeholder="Search..."
                    //   onSearch={onSearch}
                    style={{ width: 200 }}
                  />
                </Stack>

                {/* Assessment Cards */}
                <Stack gap={1} direction={"row"} flexWrap={"wrap"}>
                  {list.map((item, i) => {
                    return (
                      <Card
                        hoverable
                        key={i}
                        style={{ width: 400 }}
                        actions={[
                          // Edit
                          <Button
                            onClick={() => {
                              setUpdating(true) //set form state
                              form.setFieldValue("course", course.key)
                              form.setFieldValue("title", item.title)
                              form.setFieldValue("lesson", item.lesson)

                              onCourseChange(course.key) // get options for cascader
                              setUpdateEditorState(
                                EditorState.createWithContent(
                                  convertFromRaw({
                                    entityMap: item.content.entityMap || {},
                                    blocks: item.content.blocks,
                                  })
                                )
                              )
                              setAssessmentUpdateId(keys[i])
                              setOpenModal(true)
                            }}
                            style={{ width: "100%" }}
                            type="text"
                            htmlType="button"
                          >
                            <EditOutlined key="edit" />
                          </Button>,
                          // Delete
                          <Popconfirm
                            title="Delete Assessment"
                            description="This is a permanent action that will remove this assessment from the database, continue?"
                            okText="Continue"
                            cancelText="Cancel"
                            onConfirm={() => {
                              Assessment.delete(course.key, keys[i])
                                .then(() => {
                                  setAlert({
                                    message: "Assessment Deleted",
                                    show: true,
                                  })
                                  getAssessments()
                                })
                                .catch(err => {
                                  console.log(err)
                                })
                            }}
                          >
                            <Button type="text" danger>
                              <DeleteOutlined />
                            </Button>
                          </Popconfirm>,
                        ]}
                      >
                        {/* Card content */}
                        <Meta title={`${item.title}`} />
                        <Stack pt={1} spacing={2}>
                          <Typography
                            variant="overline"
                            color={item.lesson ? "black" : "red"}
                          >
                            {item.lesson || "Please Update"}
                          </Typography>
                          <Typography color={"GrayText"} variant="subtitle2">
                            {/* {item.content.blocks[0].text} */}
                          </Typography>
                          <Button
                            size="small"
                            type="link"
                            style={{ alignSelf: "flex-start" }}
                            onClick={() => {
                              setAssessmentDetails({
                                data: {
                                  entityMap: item.content.entityMap || {},
                                  blocks: item.content.blocks,
                                },
                                show: true,
                                title: item.title,
                                course: course.key,
                              })
                              console.log(item.content)
                            }}
                          >
                            more
                          </Button>
                          <Divider />
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={1}
                          >
                            <Stack flex={1}>
                              <Statistic
                                title="Students Submitted"
                                value={5}
                                suffix="/ 10"
                              />
                            </Stack>
                            {/* Submissions */}
                            <Button
                              type="primary"
                              onClick={() => {
                                console.log({
                                  course: course.key,
                                  chapter: item.title,
                                })
                                setSubmissions([])
                                setCourseInfo({
                                  course: course.key,
                                  chapter: item.title,
                                })
                                getSubmissions(user.groups[0], course.key)
                                setShowSubs({ ...showSubs, show: true })
                              }}
                            >
                              Submissions
                            </Button>
                          </Stack>

                          {/* View Details */}
                        </Stack>
                      </Card>
                    )
                  })}
                </Stack>
              </Collapse.Panel>
            )
          })}
        </Collapse>
      </Stack>
      {/* End Assessments */}
      <Stack direction={"row"} flexWrap={"wrap"}></Stack>
    </PageLayout>
  )
}

export default Assessments
