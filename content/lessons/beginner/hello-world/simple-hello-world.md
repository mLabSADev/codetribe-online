---
title: A simple hello world react app
date: 2020-04-26
chapter: 2
lesson: 1
---

If you completed the previous module, then you should have React installed locally on your computer. If not, then no worries - you can continue with the lessons by coding on your browser.

Start a new react project

```
yarn create react-app hello-world
```

Once it's done generating your project, copy the code below into the file "index.js".

<iframe width="100%" height="400" src="https://stackblitz.com/edit/reactfire-hello-world?embed=1&file=index.js&hideExplorer=1&hideNavigation=1&view=editor" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

> **Note:** If you plan to code on the browser, simply edit the code above and click on "Preview" to view the result. If you want to see both the result and the code at the same time, click on "Both".

The code above prints "Hello World" on the web page. Let's dissect the different elements of the code.

1. Firstly, we **import** what we need in the first two lines.
2. Then we declare a class called **App** which inherits from the class imported Component. 
3. Within the class, we override a method called **render** - in there you will notice some HTML code. As you might have guessed, the **render** method contains the HTML that needs to be rendered.
4. Lastly, we call the **render** function that we imported in step 1. This function takes our **App** component that we created at Step 2 and injects it into the root of the HTML DOM document (you will learn more about components in the next module).

Run your code using the following command

```
yarn start
```

Feel free to play around with the HTML in the render method. Try adding divs, paragraphs or any other HTML tags you might now. You will notice that sometimes you will get compile errors. In the next lesson, I will take you through the render method's do's and don'ts.