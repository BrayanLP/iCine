import { Component } from '@angular/core';
import { IonicPage, ActionSheetController,ToastController,Platform, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth';

import { File } from '@ionic-native/file';
// import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  perfilForm:FormGroup;
  lastImage: string = null;

  constructor(
    public navCtrl: NavController,
    public authData: AuthProvider,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public platform: Platform,
    private camera: Camera,
    // private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController

  ){
    let controlEmail = this.formBuilder.control({value:'', disabled: true},Validators.compose( [Validators.required,  EmailValidator.isValid] ));
    this.perfilForm = formBuilder.group({
      n: ['', Validators.compose( [Validators.required]) ],
      ap: ['', Validators.compose( [Validators.required]) ],
      am: ['',Validators.compose( [Validators.required]) ],
      c: controlEmail,
      t: ['', Validators.compose( [Validators.required]) ],
      g: ['', Validators.compose( [Validators.required]) ]
    });
    this.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }
  getUser(){
    this.authData.getUser().on('value', snapshot => {
      let data = snapshot.val();
      console.log(data);
      // this.perfilForm.value.n = "brayan";
      this.perfilForm.setValue({
        n: data.n,
        ap: data.ap,
        am: data.am,
        c: data.c,
        t:data.t,
        g:data.g
      })
    })
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Cargar de mi biblioteca',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar Camara',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }
  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }

  }
  actualizar(){
    var obj = {};
    let n = this.perfilForm.value.n;
    let am = this.perfilForm.value.am;
    let ap = this.perfilForm.value.ap;
    // let c = this.perfilForm.value.c;
    let t = this.perfilForm.value.t;
    let g = this.perfilForm.value.g;

    if(
      n != '' && n != undefined &&
      am != '' && am != undefined &&
      ap != '' && ap != undefined &&
      t != '' && t != undefined &&
      g != '' && g != undefined
    ){
      obj ={
        'n':n,
        'am':am,
        'ap':ap,
        't':t,
        'g':g
      }
      this.authData.setPerfil(obj);

    }
    else{
      console.log("Ocurrio un problema");
    }
  }
}
