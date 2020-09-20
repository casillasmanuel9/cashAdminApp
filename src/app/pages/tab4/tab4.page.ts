import { User } from './../../models/users.model';
import { Subscription } from 'rxjs';
import { AppState } from './../../store/app.reducers';
import { NavController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit, OnDestroy {

  subsUser: Subscription;
  user: User;

  constructor(private authService: AuthService, private navCrtl: NavController, private store: Store<AppState>) { }
  
  ngOnInit() {
      this.subsUser = this.store.select('usuario').subscribe(({user}) => this.user = user);
  }
  
  ngOnDestroy(): void {
    this.subsUser.unsubscribe();
  }

  logOut() {
    this.authService.logOut().then(res => {
      this.navCrtl.navigateRoot(['/login']);
    });
  }

}
