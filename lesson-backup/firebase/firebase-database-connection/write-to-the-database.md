---
title: Writing to the database
date: 2020-04-26
chapter: 3
lesson: 2
---

Firebase firestore database has three structuring options you can use to add data to your database, which are : Document, Multiple collection, subcollections within documents.  

They all have pros and cons but it all depends on how you want to structure according to your app.

- Let’s start adding one collection with a document and fields 
- To do that you need you need to implement a set() method
- This method is best when you want to write single data in document but if you want to save more data at once you will need to use the transaction and batched methods which will cover later on 

We will begin with setting a document, let’s assume our app is a book directory app that stores book lists with details.

Our data stature should look like this: 

![img](https://lh6.googleusercontent.com/gp2zU8xV4I4VapBzbJY6SBrAbaWtZ4pOWsFGKdeqS9qqKt7DVEe3cItROfig7jZj89pUP6mV4LoE94knuaV0hyfgJMgKiph-0WFvMmKt6VpwV9Nv8DMjdBWrYOVTm-iZ2EmitliO)

- **Book Category** - will be Our collection, it can have one or more book categories.
- **BookId** - is a document we will automatically generate an ID for each book entry that belongs to one category, a category will have one or more book entries
- **Book Field** - is book details stored as subcollection, it belongs to one document(bookID) 

In a real firebase it will look something like this: 

![img](https://lh5.googleusercontent.com/PSPw7hN8NK4Vh-Ru2tWDiNHUqY1B09uLVFsWmOnKlOMFmUip-rgiFSA2wwCXDGAPOb9rPuSLU4lBRk_sBljxGAUCzLuU7FjI-tnP9k1YO5LfG3DOe0XFxCuohCG2745kOPPEGnHv)

- From this firebase extract, there is one category that has two book entries 
- Each book entry has a subcollection of book details.

To add this to your database from your app you need to follow the steps as example:

1. On your home.ts file, declare array list of categories:

   ![img](https://lh3.googleusercontent.com/sNS7WnidEjGYW7-nD9_5valuvewod3bFOy78q_OUfPduF2uw6G3ttdvLw5dE4joeENA5_xoi454MakQcOrIVZW1Hczg4sz-kRVMbqf0xP3FPoghLWLknZ1FVDUW1Lr3LCnH7WgYl)

2. reate a method called addBook()

Under the method declare a newID variable which we will use to generate a new document ID for each book. Initiate that variable with firestore.createId() SDK method which generates a new id every time it is executed 

```typescript
let newId = this.firestore.createId();
```

![img](https://lh3.googleusercontent.com/BfKtcc3cR6iDXequyc_jISCYHhNAo2zvg6YW-gOtvWoVpmg2bg7FIETqqbKHsj4z1qEmv3Sgqm9QrTyVu_hSoZm6ya6rXLnCmaGwKy7dLgmEaJnoYr1DrIO-Sv26WJmgUafkGhOc)

- **newId** variable is used to assign a new id.
- **category** selects the 3rd category name from the categories List
- **this.firestore.collect().set()** method is used to write or overwrite sa single document