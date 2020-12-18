import { Action } from '@ngrx/store';
import {User} from '../../models/User';

enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  LOGOUT = '[Auth] Logout',
  GET_USER = '[Auth] Get User',
  SET_USER = '[Auth] Set User'
}

class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: {login: string, password: string}) {}
}

class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: {token: string}) {}
}

class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: {errorMessage: string}) {}
}

class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
  constructor() {}
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

class GetUser implements Action {
  readonly type = AuthActionTypes.GET_USER;
  constructor() {}
}

class SetUser implements Action {
  readonly type = AuthActionTypes.SET_USER;
  constructor(public payload: {user: User}) {}
}

type AuthAction = LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | LogOut
  | GetUser
  | SetUser

export {
  LogIn,
  LogInSuccess,
  LogInFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  LogOut,
  GetUser,
  SetUser,
  AuthActionTypes,
  AuthAction,
}
