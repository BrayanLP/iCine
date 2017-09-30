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
      if(res.val() != undefined){
        this.citas = [];
        Object.keys(res.val()).forEach(element => {  
          this.authData.getCitasId(element).on('value', response => { 
            let res = response.val();
            if(res != null ){ 
              this.citas.push(res); 
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
