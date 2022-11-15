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
    },
    currentUser: () => {
        return AuthService.isLoggedIn().then(user => {
            console.log(user.uid);
            return firebase.database().ref(`users/${user.uid}`).once('value').then(result => {
                const data = result.val()

                console.log(data);
                
                return data
            })
        })
    },
    forgotPassword: email => {
        return firebase.auth().sendPasswordResetEmail(email)
    },
    getUser: (id) => {
        return firebase.database().ref(`users/${id}`).once('value').then(snapshot => {
            return snapshot.val()
        })
    }
}