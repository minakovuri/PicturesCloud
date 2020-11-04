import { Action } from '@ngrx/store';
import {User} from '../../models/User';

enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
}

class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: {login: string, password: string}) {}
}

class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: {user: User, token: string}) {}
}

class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: {errorMessage: string}) {}
}

class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: {login: string, password: string}) {}
}

class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: {login: string, password: string}) {}
}

class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: {errorMessage: string}) {}
}

type AuthAction = LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure

export {
  LogIn,
  LogInSuccess,
  LogInFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  AuthActionTypes,
  AuthAction,
}
