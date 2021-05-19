---
title: Defining a Class
date: 2021-01-07
chapter: 4
lesson: 3
---

Typescript is a superset of JavaScript, so whatever possible to do in JavaScript is also possible in typescript. Class is a new feature added from ES6 onward, so earlier in JavaScript the class type functionality was tried using a function with prototype functionality to reuse code. Using class, you can have our code almost close to languages like java, c# etc., where the code can be reused. With the feature of class in Typescript/JavaScript, it makes the language very powerful. 

**Here is a basic class syntax in typescript:** 

```typescript
class nameofclass {
    //define your properties here
   constructor() {
    // initialize your properties here
   }
  //define methods for class
}

```

**Example: A working example on Class**

```typescript
class facilitators {
    age : number;
    names : string;
    bank_balance : number;
    constructor(age: number, names:string, bank_balance: number) {
        this.age = age;
        this.names = names;
 
    this.bank_balance = bank_balance;
    }
    getbank_balance(): number {
        return this.bank_balance;
    }
    getName() : string {
        return this.names;
    }
    getAge() : number {
        return this.age;
    }
}

```

