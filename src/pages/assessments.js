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
  Select,
  Form,
  Checkbox,
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
const COURSES = ["nodejs", "ionic", "angular", "reactjs"]
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
}
function Assessments() {
  const [openModal, setOpenModal] = React.useState(false)
  const [openEval, setEval] = React.useState(false)
  const [criteria, setCriteria] = React.useState([])
  const [form] = Form.useForm()
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
  const onFinish = values => {
    console.log("Success:", values)
  }

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }
  return (
    <PageLayout>
      <Modal
        title="New Assessment"
        style={{ width: "60%" }}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="assessment"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
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

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please add a desription" }]}
          >
            <Input.TextArea rows={7} />
          </Form.Item>

          <Form.Item
            label="Criteria"
            name="criteria"
            rules={[{ required: true, message: "Please add a criteria" }]}
          >
            <Form.List
              name="names"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 2) {
                      return Promise.reject(new Error("At least 2 criteria"))
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item key={field.key}>
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please add criteria or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input.TextArea
                          rows={2}
                          placeholder="Criteria..."
                          style={{ width: fields.length > 1 ? "80%" : "100%" }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <Button
                          type="text"
                          danger
                          onClick={() => remove(field.name)}
                        >
                          <MinusCircleOutlined className="dynamic-delete-button" />
                        </Button>
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "60%" }}
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 0 }}>
            <Button
              size="large"
              type="primary"
              style={{ width: "100%" }}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
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
                        <Button
                          onClick={() => {
                            setOpenModal(true)
                          }}
                          style={{ width: "100%" }}
                          type="primary"
                        >
                          <EditOutlined key="edit" /> Edit
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
