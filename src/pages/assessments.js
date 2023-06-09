import React, { useEffect, useState } from "react"
import PageLayout from "../templates/layout"
import { Stack, Typography, Divider, Snackbar } from "@mui/material"
import {
  Button,
  Space,
  Table,
  Tag,
  Modal,
  List,
  Card,
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
const { Column, ColumnGroup } = Table
const { Meta } = Card
const assessmentsTest = [
  {
    course: "ionic",
    assessments: [
      {
        key: "1",
        title: "Activity - Practice Set",
        description:
          "Create a digital birthday card using React Native. You  should demonstrate your understanding of React Native components, styling, and interactivity to build an engaging and visually appealing birthday card.",
        criteria: [
          {
            label:
              "Adherence to the requirements outlined in the specification.",
          },
          {
            label: "User interface design and visual appeal.",
          },
          {
            label:
              "Correct implementation of React Native components and interactivity.",
          },
        ],
      },
      {
        key: "2",
        title: "Activity - Practice Set",
        description:
          "Create a digital birthday card using React Native. You  should demonstrate your understanding of React Native components, styling, and interactivity to build an engaging and visually appealing birthday card.",
        criteria: [
          {
            label:
              "Adherence to the requirements outlined in the specification.",
          },
          {
            label: "User interface design and visual appeal.",
          },
          {
            label:
              "Correct implementation of React Native components and interactivity.",
          },
        ],
      },
      {
        key: "3",
        title: "Activity - Practice Set",
        description:
          "Create a digital birthday card using React Native. You  should demonstrate your understanding of React Native components, styling, and interactivity to build an engaging and visually appealing birthday card.",
        criteria: [
          {
            label:
              "Adherence to the requirements outlined in the specification.",
          },
          {
            label: "User interface design and visual appeal.",
          },
          {
            label:
              "Correct implementation of React Native components and interactivity.",
          },
        ],
      },
      {
        key: "4",
        title: "Activity - Practice Set",
        description:
          "Create a digital birthday card using React Native. You  should demonstrate your understanding of React Native components, styling, and interactivity to build an engaging and visually appealing birthday card.",
        criteria: [
          {
            label:
              "Adherence to the requirements outlined in the specification.",
          },
          {
            label: "User interface design and visual appeal.",
          },
          {
            label:
              "Correct implementation of React Native components and interactivity.",
          },
        ],
      },
    ],
  },
  {
    course: "react",
    assessments: [
      {
        key: "1",
        title: "Activity - Practice Set",
        description:
          "Create a digital birthday card using React Native. You  should demonstrate your understanding of React Native components, styling, and interactivity to build an engaging and visually appealing birthday card.",
        criteria: [
          {
            label:
              "Adherence to the requirements outlined in the specification.",
          },
          {
            label: "User interface design and visual appeal.",
          },
          {
            label:
              "Correct implementation of React Native components and interactivity.",
          },
        ],
      },
    ],
  },
  {
    course: "nodejs",
    assessments: [
      {
        key: "1",
        title: "Activity - Practice Set",
        description:
          "Create a digital birthday card using React Native. You  should demonstrate your understanding of React Native components, styling, and interactivity to build an engaging and visually appealing birthday card.",
        criteria: [
          {
            label:
              "Adherence to the requirements outlined in the specification.",
          },
          {
            label: "User interface design and visual appeal.",
          },
          {
            label:
              "Correct implementation of React Native components and interactivity.",
          },
        ],
      },
    ],
  },
  {
    course: "angular",
    assessments: [
      {
        key: "1",
        title: "Activity - Practice Set",
        description:
          "Create a digital birthday card using React Native. You  should demonstrate your understanding of React Native components, styling, and interactivity to build an engaging and visually appealing birthday card.",
        criteria: [
          {
            label:
              "Adherence to the requirements outlined in the specification.",
          },
          {
            label: "User interface design and visual appeal.",
          },
          {
            label:
              "Correct implementation of React Native components and interactivity.",
          },
        ],
      },
    ],
  },
]
const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
]
const COURSES = ["nodejs", "ionic", "angular", "react", "react-native"]

function Assessments() {
  const [openModal, setOpenModal] = React.useState(false)
  const [openEval, setEval] = React.useState(false)
  const [criteria, setCriteria] = React.useState([])
  const [updating, setUpdating] = React.useState(false)
  const [assessmentUpdateId, setAssessmentUpdateId] = React.useState("")
  const [assessments, setAssessments] = React.useState([])
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
  const onCourseChange = value => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" })
        break
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" })
        break
      case "other":
        form.setFieldsValue({ note: "Hi there!" })
        break
      default:
    }
  }
  const handleOk = () => {
    setOpenModal(false)
  }

  const handleCancel = () => {
    setOpenModal(false)
  }
  const getAssessments = () => {
    Assessment.getAll().then(res => {
      setAssessments(res)
    })
  }
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

  const onFinishFailed = errorInfo => {
    // TODO: give a more detailed error
    setAlert({ message: "An error occured", show: true })
  }
  useEffect(() => {
    getAssessments()
  }, [])
  return (
    <PageLayout>
      {/* Form Modal */}
      <Modal
        title={updating ? "Update Assessment" : "New Assessment"}
        // style={{ width: "80%" }}
        open={openModal}
        footer={false}
        okButtonProps={{ disabled: true }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
          <Form.Item name="course" label="Course" rules={[{ required: true }]}>
            <Select
              placeholder="Select course"
              onChange={onCourseChange}
              allowClear
            >
              {COURSES.map(item => (
                <Select.Option value={item}>{item.toUpperCase()}</Select.Option>
              ))}
            </Select>
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

          {updating && (
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: "Please add content" }]}
            >
              <Editor
                name="content"
                editorState={updateEditorState}
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

      <Stack p={5} direction={"row"} spacing={1}>
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
              <Stack py={2} direction={"row"} alignItems={"center"} spacing={1}>
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
                        // Submissions
                        <Button type="primary">Submissions</Button>,
                        // Edit
                        <Button
                          onClick={() => {
                            setUpdating(true) //set form state
                            form.setFieldValue("course", course.key)
                            form.setFieldValue("title", item.title)
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
                          type="link"
                          htmlType="button"
                        >
                          <EditOutlined key="edit" /> Edit
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
                      <Meta title={`${item.title}`} />
                      <Stack pt={1} spacing={2}>
                        <Typography color={"GrayText"} variant="caption">
                          {item.content.blocks[0].text}
                        </Typography>
                        <Button
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
                          View Content
                        </Button>
                      </Stack>
                    </Card>
                  )
                })}
              </Stack>
            </Collapse.Panel>
          )
        })}
      </Collapse>
      {/* End Assessments */}
      <Stack direction={"row"} flexWrap={"wrap"}></Stack>
    </PageLayout>
  )
}

export default Assessments
