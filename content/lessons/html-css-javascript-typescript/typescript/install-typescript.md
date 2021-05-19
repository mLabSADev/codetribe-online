---
title: How to Download and Install TypeScript
date: 2021-01-07
chapter: 4
lesson: 1
---

1. Go to the official site of nodejs : https://nodejs.org/en/download/ (https://nodejs.org/en/download/) and download and install nodejs as per your operating system. The detailed instruction on how to download nodejs is available here: https://www.guru99.com/download-install-node-js.html (https://www.guru99.com/download- install-node-js.html) 
2. To check if nodejs and npm is installed just check the version in your command prompt. 
3. Open on windows go to search command prompt or cmd and open it, on MacBook go to Search and Type …. Terminal and open it

**Terminal windows**

```bash
node -v
v10.16.3

npm -v
6.14.4
```

Our nodejs version is v10 and npm is v6, refer to yours, versions might differ, but that’s not an issue.

## **Typescript Installation**

Create your project directory and run npm init, as shown in the command below: 

**Follow Steps:**

* Navigate to desktop
* Create folder/directory
* Navigate to your folder/directory
* Run npm init 

```bash
cd desktop
mkdir test
cd test
npm init
```

This will create package.json which will store the dependencies for our project. 

## **Next step install TypeScript:**

Run npm -g install typescript to install it globally.

```bash
npm -g install typescript
```

Create source(src) folder in your project folder/directory and in src create typescript file examples.ts and write your code

## Example

```typescript
function add(x:number, y:number) {
    return x+y;
}
 
let sum = add(1,10);
console.log(sum);
```

## **Compile Typescript code to Javascript**

* To compile above code use following command
* If typescript is installed globally use below command

```bash
> tsc examples.ts
> node examples.ts
> 11
```

