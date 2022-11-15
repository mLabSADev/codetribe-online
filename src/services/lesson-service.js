import firebase from "gatsby-plugin-firebase"
import { AuthService } from "./auth-service"

export const LessonService = {
    currentLessonPosition: lessonId => {
        return AuthService.isLoggedIn().then(user => {
            if (user) {
                return firebase.database().ref(`lessons/${lessonId}/${user.uid}`).once('value').then(snapshot => {
                    const position = snapshot.val()

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
    }
}