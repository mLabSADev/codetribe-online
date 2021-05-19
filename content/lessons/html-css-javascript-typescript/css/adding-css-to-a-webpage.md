---
title: Adding CSS to a Web Page
date: 2021-01-07
chapter: 2
lesson: 1
---

1. Internally-> By embedding CSS a style tag or adding inline styles directly to CSS
2. Externally -> Importing files from existing stylesheet or creating your own stylesheet.

## **Internal CSS**

Copy, paste and run this "lines" of Code. What do you see?

```html
<html>
	<head>
		<title> My First Web Application </title>
	</head>
    <body>
        <h1 style="color:red;">Hello World</h1>
    </body>
</html>

```

The other way to add CSS is by defining the Style tag. Normally we place it above the body or below the body tag

```html
<style>
	#wordColor{
		Color: red;
	}
</style>
```

\# presents what is called an id while .represents what is called a class in HTML. Normally class tags take rap around id tags but you can use them as you please.

It is only good programming practise to make sure that class tags(.) rap around id tags(#) 

### For Example

```html
<div class= "example">	
	<div id="example1">
	</div>
</div>
```

As you can see I have used the div tag. By now you should understand the importance and use of the div tag. 

## External CSS

Task 1

* Create a file. Name it myStylesheet.css. 
* Save it 
* Open it

Congratulations you just created your first css file. This is where you can write your CSS code. We will then import it into your HTML file and be able to use it.

### For Example

```html
<html>
	<head>
		<link rel="sheetstyle" href="myStylesheet.css" type=”text/css”>
		<title> My First Web Application </title>
	</head>
	<body>
		<h1 style="color:red;">Hello CodeTribe!</h1>
	</body>
</html>

```

As you can see from the previous slide example we added **<link rel="sheetstyleet" href="myStylesheet.css">** to the head tag. Please try to make sure all links remain in your head. You will see some web applications will place their links just above the body tag. For example angular applications. Also try to practise all the good practises throw out your developer experience. 