---
title: Firebase Host Setup
date: 2021-01-07
chapter: 6
lesson: 3
---

* On your terminal run command: firebase init
* Choose option Hosting: Configure and deploy Firebase Hosting sites

![hosting-1](images/setup-firebase-hosting/hosting-1.png)

* Choose the project you created on your firebase that you want to host
* Then enter www on : “What do you want to use as your public directory”

![hosting-2](images/setup-firebase-hosting/hosting-2.png)

* Type yes to rewrite all urls to /index.html

![hosting-3](images/setup-firebase-hosting/hosting-3.png)

* Now build the app again using command: ionic build --prod