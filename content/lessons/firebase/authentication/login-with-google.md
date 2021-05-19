---
title: Login with Google
date: 2021-01-07
chapter: 4
lesson: 2
---

If you choose to authenticate your user using google the you will have to need to get a provider first firebase.auth.GoogleAuthProvider then signInWithPopup(provider)

```javascript
 var provider = new firebase.auth.GoogleAuthProvider();
 firebase.auth().signInWithPopup(provider).then((result)=>{
   console.log("successfully signed in");
   }).catch((error) =>{
     console.log(error.message);});
```

This method will open a popup with options to choose a google account a user wants to use to sign in with. After successfully signing in, the user’s record will be stored under the authentication table with Google as a provider.