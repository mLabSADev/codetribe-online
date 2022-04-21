---
title: Constructors in a TypeScript Class
date: 2021-01-07
chapter: 4
lesson: 4
---

The class facilitators example we have defined above, it has a constructor as shown below: 

```typescript
constructor(age: number, names:string, bank_balance: number) {
        this.age = age;
        this.names = names;
        this.bank_balance = bank_balance;
    }

```

The constructor method has params age, name, and bank_balance. The constructor will take care of initializing the properties when the class is called. The properties are accessed using this keyword. Example this.age to access age property, this.names to access names, etc. You can also have a default constructor, as shown below: 

```
constructor (){}
```

