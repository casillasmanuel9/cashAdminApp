import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthService
  ) { }

  crearIngresoEgreso(ingresoEgreso: any) {
    delete ingresoEgreso.uid;
    return this.fireStore
      .doc(`${this.authService.user.uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  } 

  initIngresosEgresosListener(uid: string) {
    return this.fireStore
      .collection(`${uid}/ingresos-egresos/items`, ref => ref.orderBy('date', 'desc'))
      .snapshotChanges()
      .pipe(
        map((snapshoot) =>
          snapshoot.map((doc) => ({
            uid: doc.payload.doc.id,
            ...(doc.payload.doc.data() as any),
          }))
        )
      );
  }

  borrarEgresoIngreso(uidItem: string) {
    const uid = this.authService.user.uid;
    return this.fireStore.doc(`${uid}/ingresos-egresos/items/${uidItem}`).delete();
  }
}