---
title: What is a Scrum Master?
date: 2020-04-26
chapter: 1
lesson: 4
---

You first need to install the NVM on your computer. NVM is a Node Version Manager. We will use it to install Node.js on your machine. To install it, copy the snippit below onto your terminal

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Close your terminal and open it again. And then test the following command to see if ***nvm*** was installed successfully

```bash
nvm --version
```

If nvm has installed succesfully, you will see the version number of ***nvm*** printed out.

Now that you have nvm installed, it's time to use it to install Node.js. Run the command below to install the latest recommended version of Node.js.

```bash
nvm install node
```

> **Please note:** "node" is an alias for the latest version

Lastly, install Yarn

```bash
npm install -g yarn
```

After that's done, then you are on your way to start a new React project. I'll help you do that in the next lesson.