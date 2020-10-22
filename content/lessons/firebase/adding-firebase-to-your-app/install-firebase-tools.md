---
title: Installing Firestore and Logging In
date: 2020-04-26
chapter: 2
lesson: 3
---

Next run command, you might get permission access error - just run as administrator by starting with sudo then this command:

```bash
npm install -g firebase-tools
```

After the installation is successful run command then login in to the gmail account you used to create your firebase account: 

```bash
firebase login
```

Next run command once successfully logged In:

```bash
firebase init
```

![img](https://lh3.googleusercontent.com/8EF3iDuztrLHbQMFgSiehIkJrYhgJBhtkhHeRPTqgmhY0Cf_xcGw7Dwle4EHAbAF-gTG-GJt08I_vVIpBTvN_akLAVTITYt4XKPjD8j0IegK9JkvIhZmTn8xu-MPJMvvhxcCqARm)



1. Use spacebar to select the second option: “firestore: Deploy rules and create indexes for Firestore”
2. You will be given option to choose to initiate you on existing project on firebase or create a new one, you must choose the existing project 
3. You will get a list of all your firebase projects you have created on the firebase console, select the one you want to connect your ionic project to.
4. Then click enter for the remaining options.

When all packages are installed, you will now be able to communicate with firebase. 

> NB :this is an important step and must be executed successfully.