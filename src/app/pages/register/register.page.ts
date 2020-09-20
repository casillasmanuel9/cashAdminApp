import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formLoginRegister : FormGroup;

  constructor(private formBuider: FormBuilder, private authService: AuthService, private navCrtl: NavController) { 
    this.formLoginRegister = this.formBuider.group({
      username : ["", [Validators.required]],
      email : ["", [Validators.required, Validators.email]],
      password : ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  register() {
    const { username, email, password } = this.formLoginRegister.value;
    this.authService.crearUsuario(username, email, password).then(async credenciales => {
      this.navCrtl.navigateRoot(["/"]);
    }).catch(err => console.error(err));
  }

}
