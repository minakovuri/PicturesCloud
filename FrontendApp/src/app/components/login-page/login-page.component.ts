import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';

import {AppState} from '../../store/state';
import {LogIn} from '../../store/actions/auth.actions';
import {logInStateSelector} from '../../store/selectors/log-in.selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup
  hidePassword: boolean

  authErrorMessage: string|null

  constructor(
    private store: Store<AppState>
  ) {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
    this.hidePassword = true;

    this.store
      .pipe(select(logInStateSelector))
      .subscribe((logInState) => this.authErrorMessage = logInState.errorMessage)
  }

  ngOnInit(): void {
  }

  hidePasswordChange(): void {
    this.hidePassword = !this.hidePassword
  }

  onSubmit(): void {
    const login = this.form.controls.login.value
    const password = this.form.controls.password.value

    this.store.dispatch(new LogIn({
      login, password
    }))
  }

}
