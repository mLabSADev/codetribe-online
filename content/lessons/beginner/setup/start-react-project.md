---
title: Start a new React Project
date: 2020-04-26
chapter: 1
lesson: 5
---

If you have gotten this far, you should have Node.js and Yarn installed on your computer. In this section, you will generate your first React Project and run it locally to view on your browser. Open your terminal and run the following:

```bash
yarn create react-app my-first-app
```

It will take a while to get all the required packages. Once it's done, you will see a new folder named "my-first-app". Congratulations, that's your first app. As you might have guessed, "my-first-app" at the end of the snippet above is the name if your app. You can name it anything you want.

Now navigate into your app and start it

```bash
cd my-first-app
yarn start
```

This should start your app on port 3000. To access it (if it did not open the browser automatically), go to http://localhost:3000 on your browser.

![React Starter App](images/react-starter.png)

That's it! You are now running a react app.