import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLoginRegister : FormGroup;

  constructor(private formBuider: FormBuilder) { 
    this.formLoginRegister = this.formBuider.group({
      username : ["", [Validators.required, Validators.email]],
      password : ["", Validators.required]
    });
  }

  ngOnInit() {
  }

}
