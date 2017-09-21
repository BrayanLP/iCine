import { Component } from '@angular/core';
import { 
	IonicPage, 
	NavController, 
	LoadingController, 
	Loading, 
	AlertController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth';
import { EmailValidator } from '../../validators/email';

import { LoginPage } from '../login/login';

	@IonicPage()
	@Component({
		selector: 'page-reset-password',
		templateUrl: 'reset-password.html',
	})
	export class ResetPasswordPage {
		resetPasswordForm:FormGroup;
		loading:Loading;
		constructor(
			public navCtrl: NavController, 
	  		public authData: AuthProvider,  
	  		public formBuilder: FormBuilder, 
	  		public alertCtrl: AlertController,
	  		public loadingCtrl: LoadingController 
	      
			) {
			this.resetPasswordForm = formBuilder.group({
				email: ['', Validators.compose( [Validators.required,  EmailValidator.isValid] )]
			});
		}

		ionViewDidLoad() {
			console.log('ionViewDidLoad ResetPassword');
		}
		resetPassword(){
			this.loading = this.loadingCtrl.create({
        		dismissOnPageChange: true,
      		});
      		this.loading.present();
      		if (!this.resetPasswordForm.valid){
      			if(this.resetPasswordForm.value.email === ""){
      				this.mensaje('El Correo Electrónico es requerido','');
      			}
      			else{
      				this.mensaje('Error desconocido contacte a brayanlp@grupoaizen.com','');
      			}
			}
			else{
				this.authData.resetPassword(this.resetPasswordForm.value.email)
				.then( (value)=> { 
					this.mensaje('Hemos enviado un mensaje al Correo Electrónico para restaurar la contraseña','reset');  
				})
				.catch((error : any)=>{ 
					if(error.code === "auth/user-not-found"){
						this.mensaje("No hay ningún registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado.",'');
					}
					else if(error.code === "auth/network-request-failed"){
	           			this.mensaje('Se ha producido un error de red (con el tiempo de espera, la conexión interrumpida o el host inaccesible)','');  
	          		}
					else{
						this.mensaje(error.mensaje,'');  
					}
				})

			}
		}
		mensaje(m,c){
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
				alert.onDidDismiss(() => {
					if(c === 'reset'){
				    	this.navCtrl.setRoot(LoginPage); 
					}
				  });
				alert.present();
			});  
		}
	}
