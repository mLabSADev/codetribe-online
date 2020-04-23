---
title: Ionic Data Binding
date: 2018-10-29
author: Melvin Musehani
featureImage: "./images/ionic-data-binding/ionic-data-binding.jpg"
---

## **Understanding The Data flow**

Mobile apps and Web Applications today work in a very simple manner that comprises with three steps

- Get some sort of information from the user
- Process that information with what ever algorithm you have formulated
- Output a certain result to the user

Look at the top 3 apps you use on your phone. At some point, they have fulfilled all three of those points. What is the point of an app if you don’t get an output from it?

You may argue that some apps don’t require any sort of input from the user (like the weather app). Technically, the user has given the app some sort of input. In the case of the weather app, the input is where you are in the world. Since apps are more personal, there are ways to hide the input part and make the experience for the user seamless. That’s the whole point of mobile apps. They should be personal.

Unfortunately we can only get a limited number of information from the device. In many cases we need information that only the user can type in, select or use another method of communication. In this module, we will be dealing with data binding and help you understand how data flows in your Ionic App.

By the end of this article, you will be able to understand the difference between Two-way Bind and One-way Binding

## Data Binding

Data-binding is the event of linking data to two or more entities. In Ionic, this is the linking of data between a variable in your TypeScript file and a HTML element. Since we are using Angular with Ionic, the data-binding you are going to learn is Angular’s method of data-binding. We have two type’s of binding data. **Two-way binding** and **One-way binding**. They both have their purpose which we will learn in this article.

### One Way binding

The easiest way to explain this is through a scenario. Let’s assume you and your friend have an app on your phones. This app displays a document that you are working on. Whenever your friend edits the document, you are seeing the immediate changes. However, whenever you edit the document – sadly your friend cannot see the changes. So data flows in one way. From your friend to you and never from you to your friend. That’s where the term “One-way binding” comes from. This is an exaggerated version of One-Way Binding, but that’s essentially the concept.

Let’s play around with this. Create a new project. On the home page’s typescript file – create a variable named **name** and assign the value **John Doe**.

```typescript
name = “John Doe”;
```

Go to your home’s HTML file and add the follow line inside your <ion-content> tag.

```html
<p>Your name is {{name}}</p>
```

Run your app. You should see an input field with John Doe already typed in and text below saying “Your name is John Doe”. 

Let me explain what’s happening here. Square brackets are used to bind data one-way. In our case, we are binding the variable name to our input. Whenever the variable name changes, so will any element that is bound to that variable. For input, you use the **ngModel**to bind to the input’s value. Since this is one way binding, the input does not change the variable’s data. So if I type text into the input, it will not change the value of name.

The second part of this example prints “Your name is John Doe”. Here we are using Double-Curley Brackets. This is also for one-way binding. If you want to display any variable anywhere in your HTML, use Curley brackets. We could have used this method for our input as well and it would have looked like this

```html
<ion-input ngModel=“{{name}}” type=“text” placeholder=“Name”></ion-input>
```

> NOTE: You need to make sure you remove the [].

So [] are for binding properties to variables and {{}} are for binding text to any part of the HTML document.

### Two Way Binding

Our first example of one-way binding had you and your friend working on a document. Unfortunately your changes where not being seen by your friend. Now that’s where Two-way binding comes into play. With Two-way binding, changes you make will be seen by your friend. All of this is happening immediately with no need to refresh. Data is transferred back and forth.

Remember that data-binding is between your variables in your TypeScript file and your HTML elements. Imagine your friend being the TypeScript variable and you are the HTML element. Any changes done by you is seen by your friend (the variable) and any change done by your friend is seen by your (the HTML element).

Let’s modify our little one-way binding app a little by adding () to our input. It should look like this now

```html
<ion-input [(ngModel)]=“name” type=“text” placeholder=“Name”></ion-input>
```

Run the app and try editing the text. Isn’t that cool? Whenever you edit the input, the same change changes the sentence “Your name is …” to whatever text you type.

### Something to try out

A simple use-case for what you have learned is a registration form for an email service. We have a lovely registration screen with two input fields. One field is editable and allows users to enter a first name. The other field is also editable and allows users to enter an email address. The domain for the email address is expected to be [ionicfire.com](https://ionicfire.com/). What we want our users to do is enter their first name in the first field and the other field is updated to have the “firstname@ionicfire.com”. Users are welcome to change their email address, but this will not change the user’s first name field.

This exercise uses both Two-way binding and One-way binding. Give it a shot before moving on to the next section.

That’s all for now. Happy Coding. Remember to subscribe to receive articles like these to your mail box.