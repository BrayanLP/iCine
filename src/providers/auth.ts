import { Injectable } from '@angular/core'; 
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase/app';
/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
  	*/
  @Injectable()
  export class AuthProvider {

  	constructor(public afAuth: AngularFireAuth, public afDB: AngularFireDatabase) {
  		// console.log('Hello Auth Provider');
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
      return this.afAuth.auth.currentUser.uid;
    }
    setUser(email: string, aMaterno: string, aPaterno: string, nombre: string, fecha: Date, gene: string): firebase.Promise<any> {
      var obj = {
        correo: email,
        am: aMaterno,
        ap: aPaterno,
        naci: fecha,
        n: nombre,
        n_f: nombre +" "+ aPaterno,
        rol: 3,
        g: gene
      }; 
      return this.afDB.database.ref('usuarios').child(this.afAuth.auth.currentUser.uid).set(obj);
    }
    logoutUser(): firebase.Promise<any> {
      return this.afAuth.auth.signOut();
    }

  }
