import React from "react"
import PageLayout from "../templates/layout"
import { Stack, Typography, Divider } from "@mui/material"
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
} from "antd"
import { Formik, Form, Field, ErrorMessage } from "formik"
import {
  CheckSquareOutlined,
  EllipsisOutlined,
  EditOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
const { Column, ColumnGroup } = Table
const { Meta } = Card
const assessments = [
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
function Assessments() {
  const [openModal, setOpenModal] = React.useState(false)
  const [openEval, setEval] = React.useState(false)
  const showModal = () => {
    setOpenModal(true)
  }

  const handleOk = () => {
    setOpenModal(false)
  }

  const handleCancel = () => {
    setOpenModal(false)
  }
  return (
    <PageLayout>
      <Modal
        title="New Assessment"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={values => {
            const errors = {}
            if (!values.email) {
              errors.email = "Required"
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address"
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
      <Stack p={5} direction={"row"} spacing={1}>
        <Typography variant="h5">Assessments</Typography>
        <Button onClick={showModal}>New Assessment</Button>
      </Stack>
      <Collapse defaultActiveKey={["0"]}>
        {assessments.map((course, i) => {
          return (
            <Collapse.Panel key={i} header={course.course.toUpperCase()}>
              <Stack
                direction={"row"}
                spacing={1}
                gap={1}
                alignItems={"center"}
              >
                <Stack>
                  <Statistic
                    title="Total Assessments"
                    value={course.assessments.length}
                    precision={0}
                  />
                </Stack>
              </Stack>
              <Divider />
              <Stack py={2} direction={"row"} alignItems={"center"} spacing={1}>
                <Input.Search
                  placeholder="Search..."
                  //   onSearch={onSearch}
                  style={{ width: 200 }}
                />
              </Stack>
              <Stack direction={"row"} flexWrap={"wrap"}>
                {course.assessments.map((item, i) => {
                  return (
                    <Card
                      hoverable
                      key={i}
                      style={{ width: 400 }}
                      actions={[
                        <Button type="primary">
                          <EditOutlined key="edit" /> Edit
                        </Button>,

                        <Button type="ghost">
                          <CheckSquareOutlined />
                          Evaluation
                        </Button>,
                        <Button type="text" danger>
                          <DeleteOutlined />
                        </Button>,
                      ]}
                    >
                      <Meta
                        title={`Lesson ${i + 1} ${item.title}`}
                        description={item.description}
                      />
                      <br />
                      <Divider />
                      <Stack pt={1} spacing={2}>
                        <Typography variant="subtitle1">
                          Evaluation Criteria
                        </Typography>
                        {item.criteria.map((evaluation, i) => {
                          return (
                            <Stack direction={"row"}>
                              <Stack p={0.5}>
                                <CheckSquareOutlined />
                              </Stack>
                              <Typography variant="caption">
                                {evaluation.label}
                              </Typography>
                            </Stack>
                          )
                        })}
                      </Stack>
                    </Card>
                  )
                })}
              </Stack>
            </Collapse.Panel>
          )
        })}
      </Collapse>
      <Stack direction={"row"} flexWrap={"wrap"}></Stack>
    </PageLayout>
  )
}

export default Assessments
