---
title: Firebase Database Connection
date: 2020-04-26
chapter: 3
lesson: 1
---

Now that your app is connected to your firebase project, it is time to write, read, update and delete data.

On your book directory app that you have added firebase to, go to the src/app/home.ts file Import:

```typescript
import { AngularFirestore } from 'angularfire2/firestore';
```

On your constructor inject 

```typescript
 constructor(private firestore: AngularFirestore) { }
```

Your home.ts should look like this:

```typescript
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
 
@Component({
 selector: 'app-login',
 templateUrl: './login.page.html',
 styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
 constructor(private firestore: AngularFirestore,private router: Router) { }
```

