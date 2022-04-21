---
title: Coding your app
date: 2020-04-26
chapter: 2
lesson: 6
---

* Open our app on visual studio code
* open src/app/app.module.ts file and import the following:

```typescript
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
```

* As soon as you are done importing those add them to your imports like:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
@NgModule({
 declarations: [AppComponent],
 entryComponents: [],
 imports: [
   AngularFireModule.initializeApp(environment.firebase),
   AngularFirestoreModule.enablePersistence(),
   BrowserModule, IonicModule.forRoot(), AppRoutingModule ],
 providers: [
   StatusBar,
   SplashScreen,
   { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
 ],
 bootstrap: [AppComponent]
})
export class AppModule {}
```

At this point you have accomplished steps on how to create a firebase database and connect it to your ionic application. You are now ready to read, write, delete and update your data from the app. 