import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';

import {AppState} from '../../store/state';
import {signUpStateSelector} from '../../store/selectors/sign-up.selectors';
import {SignUp} from '../../store/actions/auth.actions';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  form: FormGroup
  hidePassword: boolean

  errorMessage: string|null

  constructor(
    private store: Store<AppState>
  ) {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
    this.hidePassword = true

    this.store
      .pipe(select(signUpStateSelector))
      .subscribe((signUpState) => this.errorMessage = signUpState.errorMessage)
  }

  ngOnInit(): void {
  }

  hidePasswordChange(): void {
    this.hidePassword = !this.hidePassword
  }

  onSubmit(): void {
    const login = this.form.controls.login.value
    const password = this.form.controls.password.value

    this.store.dispatch(new SignUp({
      login,
      password
    }))

    // this.store.dispatch(new LogIn({
    //   login, password
    // }))
  }

}
