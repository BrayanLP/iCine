import { Component } from '@angular/core';
// import { NavParams, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth'; 
import { Keyobject } from '../../pipes/objetos'; 
  

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
    this.authData.getUsuarioCitas().on('value', data => {
      Object.keys(data.val()).forEach(element => { 
        this.authData.getCitas(element).on('value', response => { 
          let res = response.val();
          this.citas.push(res);
          console.log(this.citas);
        })  
      });
    });
  }

}
