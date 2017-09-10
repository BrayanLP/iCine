import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'; 

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
// import { SignupPage } from '../pages/signup-page/signup-page';

import { StatusBar } from '@ionic-native/status-bar';
import { AuthProvider } from '../providers/auth';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

const config = {
  apiKey: "AIzaSyDHT3YE-PzJbCsYa-_swmVjtvhO_Jlid6Q",
  authDomain: "icime-blp1.firebaseapp.com",
  databaseURL: "https://icime-blp1.firebaseio.com",
  projectId: "icime-blp1",
  storageBucket: "icime-blp1.appspot.com",
  messagingSenderId: "1094376524057"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // SignupPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // SignupPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    AuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
