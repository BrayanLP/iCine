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
  selector: 'page-doctores',
  templateUrl: 'doctores.html',
})
export class DoctoresPage {
  public doctoresForm:FormGroup;
  public loading:Loading; 
  public especialidades = [];
  constructor(
    public nav: NavController, 
    public authData: AuthProvider, 
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController
  ){
    this.doctoresForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      nombre: ['', Validators.compose([Validators.minLength(1), Validators.required, LetrasValidator.isValid])],
      apaterno: ['', Validators.compose([Validators.minLength(2), Validators.required, LetrasValidator.isValid])],
      amaterno: ['', Validators.compose([Validators.minLength(2), Validators.required, LetrasValidator.isValid])],
      gene: ['', Validators.compose([Validators.required])],
      especialidad: ['', Validators.compose([Validators.required])],
      fecha: ['', Validators.compose([Validators.required])]

    });
    this.getEspecialidades(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctoresPage');
  }
  signupUser(){
    let email = this.doctoresForm.value.email;
    let password = this.doctoresForm.value.password;
    let nombre = this.doctoresForm.value.nombre;
    let apaterno = this.doctoresForm.value.apaterno;
    let amaterno = this.doctoresForm.value.amaterno;
    let gene = this.doctoresForm.value.gene;
    let fecha = this.doctoresForm.value.fecha;
    let especialidad = this.doctoresForm.value.especialidad;
    let rol = "doctor";
    
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
    if (!this.doctoresForm.valid){
      if(
        email === "" && 
        password === "" &&
        nombre === "" &&
        apaterno === "" &&
        amaterno === "" &&
        gene === "" &&
        fecha === "" &&
        especialidad === ""
      ){ 
        this.mensaje('El Correo electrónico, la Contraseña, Nombre, Apellido Paterno y Materno, Genero y Fecha de Nacimiento son requeridos');
      }
      else if(email === ""){
        this.mensaje('El correo electrónico es requerido');
      }
      else if(password === ""){ 
        this.mensaje('La contraseña es requerida');  
      }
      else if(nombre === ""){ 
        this.mensaje('El Nombre es requerido');  
      }
      else if(apaterno === ""){ 
        this.mensaje('El Apellido Paterno es requerido');  
      }
      else if(amaterno === ""){ 
        this.mensaje('El Apellido Materno es requerido');  
      }
      else if(gene === ""){ 
        this.mensaje('El Genero es requerido');  
      }
      else if(fecha === ""){ 
        this.mensaje('La Fecha es requerida');  
      }
      else{
        this.mensaje('Error Desconocido contacte a brayanlp@grupoaizen.com');
      }
    } else {
      this.authData.signupUser(email, password)
      .then(() => {
        let obj = {
          c: email,
          am : amaterno,
          ap : apaterno,
          n: nombre,
          f: fecha,
          g: gene,
          n_f: nombre +" "+ apaterno,
          e: especialidad,
          rol: rol
        }
        this.authData.setDoctor(obj);
        this.nav.setRoot(HomePage);
      }, (error :any) => { 
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
  getEspecialidades(){ 
    this.authData.getEspecialidades().on('value', data => { 
      if(data.val() != undefined){
        this.especialidades = [];
        Object.keys(data.val()).forEach((element) => { 
            let nombre = element;
            let id = element;
            let obj = {
              id: id,
              nombre: nombre
            }
            this.especialidades.push(obj); 
        });
      }
    });
  }
}
