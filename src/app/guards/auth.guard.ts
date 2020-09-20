import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private navCrtl: NavController) {}

  canLoad() : Observable<boolean> {
    return this.authService.isAuth().pipe(
      take(1),
      map(fuser => fuser !== null),
      tap(resp => {
        if(resp === false) this.navCrtl.navigateRoot(['/login'])
      })
    ) 
  }
}
