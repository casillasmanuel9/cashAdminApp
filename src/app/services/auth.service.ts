import { AppState } from './../store/app.reducers';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/users.model';
import { Store } from '@ngrx/store';
import { cargarUsuarioSuccess } from '../store/actions/users.actions';

@Injectable({ 
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private navCrtl: NavController, public firestore: AngularFirestore, private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe(fUser => {
      // console.log('listener',  fUser);
      if(fUser !== null) {
        const usuario = new User(fUser.uid, fUser.email, fUser.displayName);
        this.store.dispatch(cargarUsuarioSuccess({usuario}));
      } else {
        this.store.dispatch(cargarUsuarioSuccess({usuario: null})); 
      }
    })
  }

  async crearUsuario(username: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(async ({user}) => {
      await user.updateProfile({displayName: username});
      const newUser = new User(user.uid,user.email, username);
      return this.firestore.doc(`${user.uid}/usuario`).set({...newUser}).then();
    });
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
