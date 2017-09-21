import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController, MenuController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';
// import { LoginPage } from '../page/login/login';
 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage { 
  	loginForm:FormGroup;
	  loading:Loading;
  	constructor(
  		public navCtrl: NavController, 
  		public authData: AuthProvider,  
  		public formBuilder: FormBuilder, 
  		public alertCtrl: AlertController,
  		public loadingCtrl: LoadingController, 
      public menu: MenuController
  	){


      this.loginForm = formBuilder.group({
        email: ['', Validators.compose( [Validators.required,  EmailValidator.isValid] )],
        password: ['', Validators.compose( [Validators.minLength(6),Validators.required]) ]
      });
      
      this.menu.enable(false);
  	}

  	loginUser(){
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();

      if (!this.loginForm.valid){
        // console.log(this.loginForm.value, this.loginForm.value.password,this.loginForm.value.email);
        if(this.loginForm.value.email === "" && this.loginForm.value.password === ""){ 
          this.mensaje('El correo electrónico y la contraseña son requeridos');
        }
        else if(this.loginForm.value.email === ""){
          this.mensaje('El correo electrónico es requerido');
        }
        else if(this.loginForm.value.password === ""){ 
          this.mensaje('La contraseña es requerida');  
        }
        else{
          this.mensaje('Error desconocido contacte a brayanlp@grupoaizen.com');
        }
        
  		} else {
  			this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
  			.then( authData => {
  				this.navCtrl.setRoot(HomePage); 
  			})
        .catch((error : any) => { 
          if(error.code === "auth/wrong-password"){
            this.mensaje('La contraseña no es válida o el usuario no tiene una contraseña.');
          }
          else if(error.code === "auth/user-not-found"){
           this.mensaje('No hay ningún registro de usuario correspondiente a este correo electrónico. El usuario puede haber sido eliminado.'); 
          }
          else if(error.code === "auth/network-request-failed"){
           this.mensaje('Se ha producido un error de red (con el tiempo de espera, la conexión interrumpida o el host inaccesible)');  
          }
          else{
            this.mensaje(error.mensaje); 
          }
  			}); 
  		}
  	}
    
  	goToResetPassword(){
	  	this.navCtrl.push('ResetPasswordPage');
  	}

  	createAccount(){
  	  this.navCtrl.push('SignupPage');
  	} 

    mensaje(m){
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: m,
          buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
          ]
        });
        alert.present();
      });  
    }

}
