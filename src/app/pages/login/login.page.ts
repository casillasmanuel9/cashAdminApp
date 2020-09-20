import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLoginRegister : FormGroup;

  constructor(private formBuider: FormBuilder, private authService: AuthService, private navCrtl: NavController) { 
    this.formLoginRegister = this.formBuider.group({
      email : ["", [Validators.required, Validators.email]],
      password : ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  logIn() {
    const { email, password } = this.formLoginRegister.value;
    this.authService.loginUsuario(email, password).then(credentials => {
      console.log(credentials);
      this.navCrtl.navigateRoot(['/']);
    }).catch(err => {console.error(err)});
  }

}
