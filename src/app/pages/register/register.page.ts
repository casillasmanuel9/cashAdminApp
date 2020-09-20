import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formLoginRegister : FormGroup;

  constructor(private formBuider: FormBuilder) { 
    this.formLoginRegister = this.formBuider.group({
      userName : ["", [Validators.required, Validators.email]],
      password : ["", Validators.required]
    });
  }

  ngOnInit() {
  }

}
