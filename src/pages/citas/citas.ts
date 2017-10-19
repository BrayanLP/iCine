import { Component } from '@angular/core';
// import { NavParams, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
// import { Keyobject } from '../../pipes/objetos';


@Component({
  selector: 'page-citas',
  templateUrl: 'citas.html',
})
export class CitasPage {

  public citas = [];
  public fechas = [];
  // private citas: number [] = number [];
  constructor(
    public authData: AuthProvider
  ){
    this.getCitas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Citas');
  }
  getCitas(){
    this.authData.getUsuarioCitas().on('value', res => {
      this.citas = [];
      if(res.val() != undefined){
        Object.keys(res.val()).forEach(element => {
          this.authData.getCitasId(element).on('value', response => {
            let res = response.val();
            let citas_temp = {};
            let obj_temp = {};
            let array_temp = [];
            if(res != null ){
              if(res.s === "pendiente"){
                if(this.citas.length > 0){
                  // for (var i = 0; i < this.citas.length; i++) {
                  //   // console.log(i,i);
                  //   // var result = this.citas[i];
                  //   // console.log(result);
                  //   for (var j = 0; j < this.citas[i].length; j++) {
                  //     var resultado = this.citas[i][j];
                  //     // console.log(resultado);
                      // if(resultado != undefined){
                        // if(resultado.f === res.f){
                          // this.fechas.push(res.f);
                          // array_temp = res;
                          // console.log("igual -- ",res);
                          // console.log(resultado.f, res.f);
                          // this.citas[i].push(array_temp);
                          // console.log(this.citas);
                        // }
                        // else{
                          array_temp = res;
                          // console.log("otro -- ",res);
                          this.citas.push(array_temp);
                          // this.fechas.push(res.f);
                        // }
                      // }
                  //   }
                  // }
                }
                else{
                  console.log("entre porque no exitia ninguna cita");
                  citas_temp = res;
                  // console.log(citas_temp);
                  this.citas.push(citas_temp);
                  // this.fechas.push(res.f);
                  // console.log(this.fechas);
                }
              }
            }
            else{
              this.authData.getUsuarioCitas().child(element).remove();
            }
          })
        });
      }
      else{
        this.citas = [];
        console.log("citas vacias");
      }
    });
  }
  removeCita(id){

  }

}
