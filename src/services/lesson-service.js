import firebase from "gatsby-plugin-firebase"
import { AuthService } from "./auth-service"

export const LessonService = {
    currentLessonPosition: lessonId => {
        return AuthService.isLoggedIn().then(user => {
            if (user) {
                return firebase.database().ref(`lessons/${lessonId}/${user.uid}`).once('value').then(snapshot => {
                    let position = snapshot.val()

                    if (!position) {
                        position = {
                            chapter: 0,
                            lesson: 0
                        }
                    }

                    return position
                })
            }

            return null
        })
    },
    currentLessonPositionForStudent: (studentUid, lessonId) => {
        return firebase.database().ref(`lessons/${lessonId}/${studentUid}`).once('value').then(snapshot => {
            const position = snapshot.val()

            return position
        })
    },
    setCurrentPosition: (lessonId, chapter, lesson) => {
        return AuthService.isLoggedIn().then(user => {
            if (user) {
                return firebase.database().ref(`lessons/${lessonId}/${user.uid}`).update({
                    chapter,
                    lesson
                })
            }

            return null
        })
    },
    saveQuiz: (lessonId, chapter, results) => {
        return AuthService.isLoggedIn().then(user => {
            if (user) {
                return firebase.database().ref(`quizes/${user.uid}/${lessonId}/${chapter}`).set(results)
            }
        })
    },
    getQuizResults: (lessonId, chapter) => {
        return AuthService.isLoggedIn().then(user => {
            if (user) {
                return firebase.database().ref(`quizes/${user.uid}/${lessonId}/${chapter}`).once('value').then(snapshot => {
                    return snapshot.val()
                })
            }
        })
    }
}