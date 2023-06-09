import firebase from "gatsby-plugin-firebase"
import { AuthService } from "./auth-service"

export const Assessment = {
  getAll: () => {
    return firebase
      .database()
      .ref(`assessments`)
      .once("value")
      .then(snapshot => {
        const value = snapshot.val()
        const keys = Object.keys(value)

        return keys.map(key => {
          return {
            ...value[key],
            key,
          }
        })
      })
  },
  /**
   * @param {*} id doc id
   */
  getOne: id => {
    return firebase
      .database()
      .ref(`assessments/${id}`)
      .once("value")
      .then(snapshot => {
        const value = snapshot.val()

        value.chapters = Object.keys(value.chapters)
          .map(key => {
            return {
              key,
              ...value.chapters[key],
              lessons: Object.keys(value.chapters[key].lessons)
                .map(lessonKey => {
                  return {
                    key: lessonKey,
                    ...value.chapters[key].lessons[lessonKey],
                  }
                })
                .sort((a, b) => {
                  if (a.lesson < b.lesson) {
                    return -1
                  } else {
                    return 1
                  }
                }),
            }
          })
          .sort((a, b) => {
            if (a.chapter < b.chapter) {
              return -1
            } else {
              return 1
            }
          })

        return value
      })
  },
  /**
   * @param {*} data form data
   */
  add: data => {
    return firebase.database().ref(`assessments/${data.course}`).push({
      title: data.title,
      content: data.content,
      created: new Date().toISOString(),
    })
  },
  /**
   * @param {*} id  doc id
   */
  deleteAssessment: id => {
    return firebase.database().ref(`assessments/${id}`).remove()
  },
  /**
   * @param {*} id doc id
   * @param {*} data form data
   */
  update: (id, data) => {
    return firebase
      .database()
      .ref(`assessments/${id}`)
      .update({
        ...data,
      })
  },
}
