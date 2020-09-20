import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private authService: AuthService, private navCrtl: NavController) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logOut().then(res => {
      this.navCrtl.navigateRoot(['/login']);
    });
  }

}
