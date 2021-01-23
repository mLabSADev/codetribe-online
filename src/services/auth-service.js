import firebase from "gatsby-plugin-firebase"

export const AuthService = {
    login: (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    },
    isLoggedIn: () => {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    resolve(user)
                } else {
                    reject()
                }
            })
        })
    }
}