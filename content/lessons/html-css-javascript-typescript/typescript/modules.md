---
title: What are the Modules in Typescript? 
date: 2021-01-07
chapter: 4
lesson: 9
---

The files created in typescript have global access, which means that variables declared in one file are easily accessed in another file. This global nature can cause code conflicts and can cause issues with execution at run-time. You have export and import module functionality which can be used to avoid global variable, function conflicts. This feature is available in JavaScript with ES6 release and also supported in typescript. Why do you need Modules in Typescript? Following example shows the issue without modules: 

```typescript
let age : number = 25;
```

With **Modules,** the code written remains locale to the file and cannot be accessed outside it. 

To access anything from the file, it has to be exported using the export keyword. It is used when you want the variable, class, function, or interface to be used in another file. **Import** is used when you want to access the exported variable, class, or interface or function too. Doing so the code is written remains intact within the file, and even if you define same variable names, they are not mixed up and behave local to the file where they are declared. 

## **Using Export and Import**

Example:

```typescript
import {nameof thevariable or class name or interfacename} from "file path here without.ts"
```

How to use it:

```typescript
import { age } from ".examples"
```

Exporting:

```typescript
export let age: number = 26;
```

