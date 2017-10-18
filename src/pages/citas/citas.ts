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
                  for (var i = 0; i < this.citas.length; i++) {
                      var resultado = this.citas[i][i];
                      if(resultado != undefined){
                        if(resultado.f === res.f){
                          array_temp = res;
                          this.citas[i].push(array_temp);
                        }
                        else{
                          array_temp = [res];
                          this.citas.push(array_temp);
                        }
                      }
                  }
                }
                else{
                  console.log("entre porque no exitia ninguna cita");
                  citas_temp = [res];
                  console.log(citas_temp);
                  this.citas.push(citas_temp);
                  console.log(this.citas);
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
