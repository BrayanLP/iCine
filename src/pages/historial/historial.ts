import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {
  public citas = [];
  constructor(
    public navCtrl: NavController,
    public authData : AuthProvider,
    public navParams: NavParams
  ){
    this.getCitas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialPage');
  }
  getCitas(){
    this.authData.getUsuarioCitas().on('value', res => {
      if(res.val() != undefined){
        this.citas = [];
        Object.keys(res.val()).forEach(element => {
          this.authData.getCitasId(element).on('value', response => {
            let res = response.val();
            console.log(res);
            if(res != null ){
              if(res.s === "finalizado"){
                this.citas.push(res);
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

}
