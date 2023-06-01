import firebase from "gatsby-plugin-firebase"

export const AuthService = {
    createUser: (user) => {
        return firebase.database().ref(`users`).orderByChild('email').equalTo(user.email).once('value').then(snapshot => {
            if (snapshot.exists()) {
                throw new Error('User already exists')
            } else {
                return firebase.database().ref(`users`).push({
                    ...user,
                    registered: false,
                    createdAt: firebase.database.ServerValue.TIMESTAMP
                })
            }
        })
        
    },
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
            return firebase.database().ref(`users/${user.uid}`).once('value').then(result => {
                const data = result.val()
                
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
    },
    keepPassword: () => {
        const { uid } = firebase.auth().currentUser

        return firebase.database().ref(`users/${uid}`).update({
            changedPassword: true
        })
    },
    getUser: (id) => {
        return firebase.database().ref(`users/${id}`).once('value').then(snapshot => {
            return snapshot.val()
        })
    }
}