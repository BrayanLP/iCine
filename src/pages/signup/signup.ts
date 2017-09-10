import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  LoadingController, 
  Loading, 
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';
import { LetrasValidator } from '../../validators/letras';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm:FormGroup;
  public loading:Loading; 
  // emailRegex: any = '/^[a-zA-Z\_\- ]*$/';
   
  constructor(public nav: NavController, public authData: AuthProvider, 
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController) {

    // var obj = [{ email: this.signupForm.value.email, amat: this.signupForm.value.amaterno, apat: this.signupForm.value.aparterno, naci: this.signupForm.value.fecha, nom: this.signupForm.value.nombre, full: this.signupForm.value.nombre +" "+ this.signupForm.value.apaterno }];
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      nombre: ['', Validators.compose([Validators.minLength(1), Validators.required, LetrasValidator.isValid])],
      apaterno: ['', Validators.compose([Validators.minLength(2), Validators.required, LetrasValidator.isValid])],
      amaterno: ['', Validators.compose([Validators.minLength(2), Validators.required, LetrasValidator.isValid])],
      gene: ['', Validators.compose([Validators.required])],
      fecha: ['', Validators.compose([Validators.required])]

    });
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  signupUser(){
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
    if (!this.signupForm.valid){
      // console.log(this.signupForm.value);
      if(
        this.signupForm.value.email === "" && 
        this.signupForm.value.password === "" &&
        this.signupForm.value.nombre === "" &&
        this.signupForm.value.apaterno === "" &&
        this.signupForm.value.amaterno === "" &&
        this.signupForm.value.gene === "" &&
        this.signupForm.value.fecha === ""){ 
        this.mensaje('El Correo electrónico, la Contraseña, Nombre, Apellido Paterno y Materno, Genero y Fecha de Nacimiento son requeridos');
      }
      else if(this.signupForm.value.email === ""){
        this.mensaje('El correo electrónico es requerido');
      }
      else if(this.signupForm.value.password === ""){ 
        this.mensaje('La contraseña es requerida');  
      }
      else if(this.signupForm.value.nombre === ""){ 
        this.mensaje('El Nombre es requerido');  
      }
      else if(this.signupForm.value.apaterno === ""){ 
        this.mensaje('El Apellido Paterno es requerido');  
      }
      else if(this.signupForm.value.amaterno === ""){ 
        this.mensaje('El Apellido Materno es requerido');  
      }
      else if(this.signupForm.value.gene === ""){ 
        this.mensaje('El Genero es requerido');  
      }
      else if(this.signupForm.value.fecha === ""){ 
        this.mensaje('La Fecha es requerida');  
      }
      else{
        this.mensaje('Error Desconocido contacte a brayanlp@grupoaizen.com');
      }
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then(() => {

        this.authData.setUser(this.signupForm.value.email, this.signupForm.value.amaterno, this.signupForm.value.apaterno, this.signupForm.value.nombre, this.signupForm.value.fecha, this.signupForm.value.gene);
        this.nav.setRoot(HomePage);
      }, (error :any) => {
        console.log(error);
        if(error.code === "auth/email-already-in-use"){
          this.mensaje('La dirección de correo electrónico ya está en uso por otra cuenta.');
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