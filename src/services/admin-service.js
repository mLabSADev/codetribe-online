import firebase from "gatsby-plugin-firebase"

export const Assessments = {
  getAll: () => {
    console.log("Get All")
  },
  /**
   *
   * @param {*} id doc id
   */
  getOne: id => {
    console.log("Get one ", id)
  },
  /**
   *
   * @param {*} data form data
   */
  add: data => {
    console.log("Add assessment ", data)
  },
  /**
   *
   * @param {*} id  doc id
   */
  deleteAssessment: id => {
    console.log("Delete Assessment ", id)
  },
  /**
   *
   * @param {*} id doc id
   * @param {*} data form data
   */
  update: (id, data) => {
    console.log("Update assessment ", id, " > ", data)
  },
}
