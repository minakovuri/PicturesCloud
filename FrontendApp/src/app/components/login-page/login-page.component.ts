import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup
  hidePassword: boolean

  constructor() {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
    this.hidePassword = true;
  }

  ngOnInit(): void {
  }

  hidePasswordChange(): void {
    this.hidePassword = !this.hidePassword
  }

  onSubmit(): void {
    const login = this.form.controls.login.value
    const password = this.form.controls.password.value

    console.log(login, password)
  }

}
