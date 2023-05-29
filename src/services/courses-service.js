import firebase from "gatsby-plugin-firebase"
import { AuthService } from "./auth-service"

export const CoursesService = {
    lesson: (course, chapter, lesson) => {
        return firebase.database().ref(`courses/${course}/chapters/${chapter}/lessons/${lesson}`).once('value').then(snapshot => {
            return snapshot.val()
        })
    },
    courses: () => {
        return firebase.database().ref(`courses`).once('value').then(snapshot => {
            const value = snapshot.val()
            const keys = Object.keys(value)

            return keys.map(key => {
                return {
                    ...value[key],
                    key
                }
            })
        })
    },
    course: (id) => {
        return firebase.database().ref(`courses/${id}`).once('value').then(snapshot => {
            const value = snapshot.val()

            value.chapters = Object.keys(value.chapters).map(key => {
                return {
                    key,
                    ...value.chapters[key],
                    lessons: Object.keys(value.chapters[key].lessons).map(lessonKey => {
                        return {
                            key: lessonKey,
                            ...value.chapters[key].lessons[lessonKey]
                        }
                    }).sort((a, b) => {
                        if (a.lesson < b.lesson) {
                            return  -1
                        } else {
                            return 1
                        }
                    })
                }
            }).sort((a, b) => {
                if (a.chapter < b.chapter) {
                    return  -1
                } else {
                    return 1
                }
            })

            return value
        })
    },
}