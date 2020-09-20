import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private navCrtl: NavController) { }

  initAuthListener() {
    this.auth.authState.subscribe(fUser => {
      //console.log('listener',  fUser);
    })
  }

  crearUsuario(username: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState;
  }
}
