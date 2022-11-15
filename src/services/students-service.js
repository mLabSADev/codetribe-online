import firebase from "gatsby-plugin-firebase"
import { AuthService } from "./auth-service"

export const StudentsService = {
    students: () => {
        return AuthService.currentUser().then(user => {
            if (user) {
                return firebase.database().ref(`users`).once('value').then(snapshot => {
                    const value = snapshot.val()
                    const keys = Object.keys(value)
        
                    return keys.map(key => {
                        return {
                            ...value[key],
                            key
                        }
                    }).filter(student => {
                        return user && user.role == 'facilitator' && user.groups.indexOf(student.location) != -1
                    }).sort((a, b) => a.firstname < b.firstname ? -1 : 1)
                }).then(students => {
                    return {
                        groups: user.groups,
                        students: students
                    }
                })
            } else {
                return {
                    groups: [],
                    students: []
                }
            }
        })
        
    }
}