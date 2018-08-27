import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from '@firebase/app';
import '@firebase/auth';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.tokenPresent());

  private tokenPresent(): boolean {
    let tokenUser = localStorage.getItem("token");
    //console.log("AuthServices tokenUser:" + tokenUser);
    return !!localStorage.getItem("token");
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
   public afAuth: AngularFireAuth
 ){}

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        localStorage.setItem("token", res.user["l"]);
        if (localStorage.getItem("token") !== '')
          this.loggedIn.next(true);
        //console.log(res.user["l"]);//token
        //console.log(res.user["email"]);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        localStorage.setItem("token", res.user["l"]);
        if (localStorage.getItem("token") !== '')
          this.loggedIn.next(true);
        //console.log(res.user["l"]);//token
        //console.log(res.user["email"]);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        localStorage.setItem("token", res.user["l"]);
        if (localStorage.getItem("token") !== '')
          this.loggedIn.next(true);
        //console.log(res.user["l"]);//token
        //console.log(res.user["email"]);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        resolve();
        localStorage.setItem("token", '');
        this.loggedIn.next(false);
      }
      else{
        reject();
      }
    });
  }
}
