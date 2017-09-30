import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrarCitaPage } from '../pages/registrar-cita/registrar-cita';
// import { DoctoresPage } from '../pages/doctores/doctores';
import { PerfilPage } from '../pages/perfil/perfil';
import { InfoPage } from '../pages/info/info';
// import { SignupPage } from '../pages/signup-page/signup-page';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  pages = [];

  constructor(
    public platform: Platform,
    public afAuth: AngularFireAuth,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authData: AuthProvider
   ) {


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Registrar cita', component: RegistrarCitaPage },
      { title: 'Perfil', component: PerfilPage },
      { title: 'Acerda de', component: InfoPage }
      // { title: 'Doctores', component: DoctoresPage }
      // { title: 'Login', component: LoginPage }
    ];
    this.state();



    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
  // Logout de usuario
  salir(){
    this.authData.logoutUser()
    .then(() => {
      this.state();
    })
    .catch((e)=>{
      console.log(e);
    });
  }
  state(){
    this.afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     // Okay, so the platform is ready and our plugins are available.
  //     // Here you can do any higher level native things you might need.
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  // }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.rootPage = page.component;
  }
}
