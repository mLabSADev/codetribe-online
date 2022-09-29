import firebase from "gatsby-plugin-firebase"
import { AuthService } from "./auth-service"

export const ProfileService = {
    profile: () => {
        return AuthService.isLoggedIn().then(user => {
            console.log(user.uid);
            return firebase.database().ref(`users/${user.uid}`).once('value').then(snapshot => {
                return {
                    ...snapshot.val(),
                    uid: user.uid
                }
            })
        })
    },

    observerProfile: (callback) => {
        AuthService.isLoggedIn().then(user => {
            firebase.database().ref(`users/${user.uid}`).on('value', snapshot => {
                callback({
                    ...snapshot.val(),
                    uid: user.uid
                })
            })
        })
    },

    updateProfile: (uid, profile) => {
        return firebase.database().ref(`users/${uid}`).update(profile)
    }
}