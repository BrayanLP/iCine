import { Component } from '@angular/core';
// import { NavController, LoadingController, Loading, AlertController, MenuController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth';
import * as moment from 'moment';
// import { FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'page-registrar-cita',
  templateUrl: 'registrar-cita.html',
})
export class RegistrarCitaPage {
  // especialidades: FirebaseListObservable<any[]>;
  public especialidades = [];
  public doctores = [];
  maxDateStr = [];
  maxDate:any = '';
  minDate:any =  '';
  minHora:any = '';
  maxHora:any = '';
  habilitar_hora:any;
  habilitar_fecha:any;
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
    // this.citaForm.value.fecha = new Date().toISOString();
    // console.log(this.citaForm.value.fecha);
    // this.minFecha = "2017-08-17";
    this.getDate();
    this.getEspecialidades();
    // this.getDoctores();

    // this.especialidades = [];


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarCita');
  }
  registrarCita(){
    var obj = {};
    let e = this.citaForm.value.especialidad;
    let d = this.citaForm.value.doctor;
    let f = this.citaForm.value.fecha;
    let h = this.citaForm.value.hora;
    obj ={
      'd':d,
      'f':f,
      'e':e,
      'h':h,
      's':true
    }
    console.log(obj);
    this.authData.registrarCita('citas',obj);
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
  getDoctores(responde_especialidad, responde_hora){
    this.authData.getDoctores().on('value', data => {
      let response:any = data.val();
      if(response != undefined){
        let fecha = this.citaForm.value.fecha.split("-");
        let anio = fecha[0];
        let mes = fecha[1];
        let dia = fecha[2];
        this.doctores = [];
        Object.keys(response).forEach((element)=>{
          let nombre =  response[element].n_f;
          let id =  element;
          let especialidad =  response[element].e;
          if(especialidad === responde_especialidad){
            this.authData.getHorario(id,anio,mes,dia,responde_hora).on('value', horario => {
              let cupon:any = horario.val();
              if(cupon != null){
                  let obj = {
                    id: id,
                    nombre: nombre
                  }
                  this.doctores.push(obj);
              }
              else{
                console.log("que paso aqui?");
              }
            })
          }
          else{
            // console.log("no entro el doctor "+nombre);
          }
        })
      }
    });
  }
  getDate(){
    let now = moment().format();
    let fecha = now.substring(0,10);
    let hora = now.substring(0,16);
    this.minDate = fecha;
    this.minHora = hora;
    // console.log(hora);
  }

  onChange(date){
    let hoy = moment().format().substring(0,10);
    if( hoy === date){
      console.log(hoy, date);
      this.minHora = moment().format().substring(0,16);
      this.citaForm.value.hora = "";
      this.habilitar_hora = false;
      // alert("no hay cupos para hoy");
    }
    else{
      this.minHora = "2010-09-26T18:47";
      this.habilitar_hora = true;

    }
    // this.minDate = res;
    // console.log(res);
  }
  cambioEspecialidad(e){
    console.log(e);
    if(e != undefined){
      this.habilitar_fecha = true;
      if(this.citaForm.value.doctor != undefined){
        // this.getDoctores(e);
      }
      else{
        console.log("no pasa nada");
      }
    }
    else{

    }
  }
  cambioHora(response){
    // console.log(response);
    let e = this.citaForm.value.especialidad;
    // let d = this.citaForm.value.doctor;
    // let f = this.citaForm.value.fecha;
    // let h = this.citaForm.value.hora;
    if(
      response != undefined
    ){
      // console.log(e,d,f,h,response);
      this.getDoctores(e,response);

    }
  }
  // FiltroDoctor(response){
  //   console.log(response);
  //   let e = this.citaForm.value.especialidad;
  //   let d = this.citaForm.value.doctor;
  //   let f = this.citaForm.value.fecha;
  //   let h = this.citaForm.value.hora;
  //   if(
  //     e != undefined &&
  //     f != undefined &&
  //     h != undefined
  //   ){
  //     console.log(e,d,f,h);
  //     this.getDoctores(e);

  //   }
  // }


}
