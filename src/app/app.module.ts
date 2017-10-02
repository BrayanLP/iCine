import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { CitasPage } from '../pages/citas/citas';
import { RegistrarCitaPage } from '../pages/registrar-cita/registrar-cita';
import { DoctoresPage } from '../pages/doctores/doctores';
import { PerfilPage } from '../pages/perfil/perfil';
import { InfoPage } from '../pages/info/info';
import { HistorialPage } from '../pages/historial/historial';


import { LoginPage } from '../pages/login/login';
// import { SignupPage } from '../pages/signup-page/signup-page';

import { StatusBar } from '@ionic-native/status-bar';
import { AuthProvider } from '../providers/auth';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

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
    LoginPage,
    CitasPage,
    RegistrarCitaPage,
    DoctoresPage,
    PerfilPage,
    InfoPage,
    HistorialPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      monthNames: ['Enero', 'Febrero', 'Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre']

    }),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CitasPage,
    RegistrarCitaPage,
    DoctoresPage,
    PerfilPage,
    InfoPage,
    HistorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
