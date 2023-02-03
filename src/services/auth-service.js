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
    logout: () => {
        return firebase.auth().signOut()
    },
    changePassword: (currentPassword, password) => {
        const { email, uid } = firebase.auth().currentUser

        return firebase.auth().signInWithEmailAndPassword(email, currentPassword).then(() => {
            return firebase.auth().currentUser.updatePassword(password).then(() => {
                return firebase.database().ref(`users/${uid}`).update({
                    changedPassword: true
                })
            })
        })
        
    }
}