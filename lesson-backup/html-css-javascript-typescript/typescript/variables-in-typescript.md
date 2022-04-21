---
title: Variables in TypeScript
date: 2021-01-07
chapter: 4
lesson: 2
---

Variables are used to store values, and the value can be a string, number, Boolean, or an expression. When it comes to variables in Typescript, they are similar to JavaScript. So let's learn to declare and assign value to variables in Typescript. 

Variables cannot be used in code without defining. To declare a variable you can use.

* **var** keyword
* **let** keyword 
* **const** keyword 

Working with variables in typescript is similar to javascript, and users familiar with javascript will find it very easy. Only variables like let and const are not much used in comparison to var. 

## **Types in Typescript** 

Typescript is a strongly typed language, whereas javascript is not. A variable which has a value defined as a string can be changed to a number without any issues in Javascript. The same is not tolerated in typescript. In typescript, the type to a variable is defined at the start only and through the execution, it has to maintain the same type any changes to it will lead to a compile-time error during compilation to javascript. 

## **Following are the types:** 

* Number 
* String 
* Boolean 
* Any 
* Void

**Number:** will take only integers, floats, fractions, etc. 

Example:

```typescript
let a :number = 1;
let price :number = 100.5;
let age :number = 20;
```

**String:** only string values 

Example:

```typescript
let user :boolean = 2;
let acounts :boolean = true;
```

**Any:** Accepts any type

Example:

```typescript
let a :any = 123445;
a = "i can be assigned any value";
```

**Void:** type is mostly used as a return type on a function which does not have anything to return. 

Example:

```typescript
function users():void{
    //Your code goes here
 }
```

## What is an Array?

- An array is a data type in typescript wherein you can store multiple values. Let's learn how to declare and assign values for an array. 
- Since typescript is a strongly typed language, you have to tell what will be the data type of the values in an array. Otherwise, it will consider it as of type any.

Example:

```typescript
//let nameofthearray : Array<typehere>
 
let names: Array<string> = ["Tyson", "Zanoxolo", "Sihle"]; 
let ages: Array<number> = [28, 26, 29];
let names_ages: Array<string | number> = ["Tyson", 28, "Zanoxolo", 26, "Sihle", 29]; 
 
let alltypes: Array<any> = [true, false, "Tyson", 20, { "Zano": "20", "Sihle":"29" }]; 
```

