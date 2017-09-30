import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFire } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase/app';
/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
  	*/
  @Injectable()
  export class AuthProvider {
    especialidades: FirebaseListObservable<any[]>;
  	constructor(public afAuth: AngularFireAuth, public afDB: AngularFireDatabase) {
  	}
  	loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
  		return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  	}
  	resetPassword(email: string): firebase.Promise<any> {
	  	return this.afAuth.auth.sendPasswordResetEmail(email);
  	}
  	signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
  	  return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  	}
    getUser(){
      return this.afDB.database.ref('usuarios').child(this.afAuth.auth.currentUser.uid);
    }
    setUser(obj){
      return this.afDB.database.ref('usuarios').child(this.afAuth.auth.currentUser.uid).set(obj);
    }
    setDoctor(obj){
      return this.afDB.database.ref('doctores').child(this.afAuth.auth.currentUser.uid).set(obj);
    }
    getEspecialidades(){
      return this.afDB.database.ref('/especialidades');
    }
    getEspecialidadesId(id){
      return this.afDB.database.ref('/especialidades').child(id);
    }
    getDoctores(){
      return this.afDB.database.ref('/doctores');
    }
    getHorario(id,anio,mes,dia,hora){
      return this.afDB.database.ref('/horarios/'+id+'/'+anio+'/'+mes+'/'+dia+'/'+hora);
    }
    registrarCita(url, obj){
      let temp_citas = {};
      let temp_usuario = {};
      let key = this.afDB.database.ref(url).push().key;
      let citas = this.afDB.database.ref(url);
      let usuario = this.afDB.database.ref('usuarios').child(this.afAuth.auth.currentUser.uid+'/citas');
      temp_citas[key] = obj;
      citas.update(temp_citas);
      temp_usuario[key] = true;
      usuario.update(temp_usuario);
    }
    getUsuarioCitas(){
      return this.afDB.database.ref('usuarios').child(this.afAuth.auth.currentUser.uid+'/citas');
    }
    getCitasId(id){
      return this.afDB.database.ref('citas').child(id);
    }
    getCitas(){
      return this.afDB.database.ref('citas');
    }

    logoutUser(): firebase.Promise<any> {
      return this.afAuth.auth.signOut();
    }

  }
