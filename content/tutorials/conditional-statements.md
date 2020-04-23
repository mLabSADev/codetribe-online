---
title: Conditional Statements
date: 2018-10-30
author: Melvin Musehani
featureImage: ./images/conditional-statements/conditional-statements.jpg
seoTitle: Conditional Statements in Angular
---

If you are reading this, then you should be familiar with flow controls like *if statements*. In JavaScript, *if statements* are used to control the flow of the app and make certain decisions. Angular has similar conditional statements called *ngIf.

*ngIf is a **directive**. A directive is an attribute you can give a HTML element, and change the element’s behaviour or they way it looks. It’s possible to create your own directives in Angular, but for now let’s just work with the directives that are built into Angular.

## Working with *ngIf

If you have an app that displays a list of your contacts, you will see a list view when there are contacts stored. Imagine that your phone is new and you haven’t added any contacts yet. The app shouldn’t display the list view. Rather, it should display a message saying you don’t have any contacts. That’s one scenario you can use an *ngIf.

Enough with the theory, here’s a practical example you can try out. We will make a simple app that will hide some text depending on a state. 

Create a new Ionic project. Add a boolean variable to your home page called **showText** and set it’s value to **true**.

```typescript
showText: Boolean = true
```

Now create a method **setShowText(showText: Boolean)**

```typescript
setShowText(showText: Boolean) {
    this.showText = showText;
}
```

In the HTML file, create two buttons and some text below

```html
<ion-button (click)=“setShowText(true)”>Show Text</ion-button>
<ion-button (click)=“setShowText(false)”>Hide Text</ion-button>
<p *ngIf=“showText==true”>Hello World, trying out Ionic Here</p>
```

Run the app now. The <p> tag will be shown if **showText** is **true** and hidden if it’s **false**.

Another way to hide elements is by using the property ngHide

```html
<p [ngHide]=“showText==false”>Hello World, trying out Ionic Here</p>
```

This gives the same result as the initial example. So which one should you use? Before deciding, you need to understand the difference between the two. ***ngIf** will remove the element from HTML’s DOM and **ngHide** will rather set the **display** CSS property of the element to **none**. Use your browsers inspector to see what happens when you show and hide the text using the scenarios above.

## **Else** Ifs

What are if statements without the else part? You can counter an if statement with an else to display a certain element. Let’s return to our example we did earlier. We had two buttons that show and hide the paragraph element. Let’s create another paragraph element with the text “Text is hidden”. Obviously this text will be shown whenever we press the hide button. Here’s the updated code.

```html
<p *ngIf=“showText==true; else showHidden”>Hello World, trying out Ionic Here</p>
<ng-template #showHidden>
    <p>Text is Hidden</p>
</ng-template>
```

The addition we added is **“**; else showHidden**”** to our initial example. **showHidden** is a template variable. It references DOM elements. In our case, we have <ng-template> with **#showHidden**. That’s where the reference get’s assigned. The **showHidden** template reference is assigned to the <ng-template> element.

You must be wondering what’s an **ng-template**. An **ng-template** is a virtual element. It doesn’t exist until it’s needed. So only when our statement hits the else part, Angular will replace whatever was supposed to be shown by the ***ngIf** with the contents inside **ng-template.**

## Then Cases

You may want to be more flexible with your HTML components and not restricted to having your results within the *ngIf. For that you can use the “then” statement. Here’s an example below:

```html
<ng-container *ngIf=“gender === ‘m’; then male else female”></ng-container>
<ng-template #male>Hello Guy</ng-template>
<ng-template #female>Hey Lady</ng-template>
```

## **Switch** **Cases**

Switch cases are another thing of beauty to add to your arsenal. They essentially prevent you from having many if-else statements, making your code much more easier to read. Let us assume you want to display the country name based on the country code. If you were to use if-then-else, your code will end up like this:

```html
<ng-container 
*ngIf=“countryCode === ‘RSA’; then rsa; countryCode === ‘USA’; then usa; countryCode === ‘UK’; then uk else dontknow”>
</ng-container>
<ng-template #rsa>South Africa</ng-template>
<ng-template #usa>United States of America</ng-template>
<ng-template #uk>United Kindom</ng-template>
<ng-template #dontknow>I don’t know what country that is</ng-template>
```

Now that’s not very pleasant. A better way of doing it with a switch statement is like this:

```html
<div [ngSwitch]=“countryCode”>
    <p *ngSwitchCase=“‘RSA’”>South Africa</p>
    <p *ngSwitchCase=“‘USA’”>United States of America</p>
    <p *ngSwitchCase=“‘UK’”>United Kingdom</p>
    <p *ngSwitchDefault>I don’t know what country that is</p>
</div>
```

This is much more readable and will definitely save your life (literally, assuming you don’t work alone). I hope you found this article useful, and will use what you learned to build something great. All the best!