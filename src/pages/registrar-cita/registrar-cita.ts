import { Component } from '@angular/core';
// import { NavController, LoadingController, Loading, AlertController, MenuController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth';
// import { FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'page-registrar-cita',
  templateUrl: 'registrar-cita.html',
})
export class RegistrarCitaPage {
  // especialidades: FirebaseListObservable<any[]>;  
  public especialidades : any;
  citaForm:FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public authData: AuthProvider, 
  ) {
    this.citaForm = formBuilder.group({
      fecha: ['', Validators.compose( [Validators.required] )],
      hora: ['', Validators.compose( [Validators.required]) ],
      especialidad: ['', Validators.compose( [Validators.required]) ],
      doctor: ['', Validators.compose( [Validators.required]) ]
    }); 
    this.getEspecialidades(); 
    // this.especialidades = [];
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarCita');
  }
  registrarCita(){
    var obj ={
      'd':this.citaForm.value.doctor,
      'e':this.citaForm.value.especialidad,
      'f':this.citaForm.value.fecha,
      'h':this.citaForm.value.hora 
    }
    console.log(obj);
    this.authData.registrarCita('citas',obj);
    // this.authData.crear('usuarios'+ ,obj);
  }
  getEspecialidades(){ 
    this.authData.getEspecialidades().on('value', data => {
      this.especialidades = data.val(); 
    });
  }

  

}
