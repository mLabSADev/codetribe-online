---
title: What is an Enum?
date: 2021-01-07
chapter: 4
lesson: 8
---

An enum is an object which has a collection of related values stored together. Javascript does not support enums. Programming languages like java, c, c++ supports enum and it is also available with typescript too. Enums are defined using the keyword enum. 

## **How to declare an Enum? Syntax:** 

```typescript
enum details {
    age,
    bank_balance,
    surname,
    West 
}
//how to make use of Enum in your code:
console.log(details.age); // output is  0
console.log(details["age"]); // output is 0
console.log(details[0]); //output is Age
```

