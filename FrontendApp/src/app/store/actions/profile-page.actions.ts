import {Action} from '@ngrx/store';

enum ProfilePageActionTypes {
  OPEN_CHANGE_LOGIN_POPUP = '[Profile Page] Open Change Login Popup',
  CLOSE_CHANGE_LOGIN_POPUP = '[Profile Page] Close Change Login Popup',
  OPEN_CHANGE_PASSWORD_POPUP = '[Profile Page] Open Change Password Popup',
  CLOSE_CHANGE_PASSWORD_POPUP = '[Profile Page] Close Change Password Popup',
  CHANGE_LOGIN = '[Profile Page] Change Login',
  CHANGE_PASSWORD = '[Profile Page] Change Password',
  CHANGE_LOGIN_FAILURE = '[Profile Page] Change Login Failure',
  CHANGE_LOGIN_SUCCESS = '[Profile Page] Change Login Success',
  CHANGE_PASSWORD_FAILURE = '[Profile Page] Change Password Failure',
  CHANGE_PASSWORD_SUCCESS = '[Profile Page] Change Password Success',
  CLOSE_PROFILE_PAGE = '[Profile Page] Close Profile Page'
}

class OpenChangeLoginPopup implements Action {
  readonly type = ProfilePageActionTypes.OPEN_CHANGE_LOGIN_POPUP
  constructor() {}
}

class CloseChangeLoginPopup implements Action {
  readonly type = ProfilePageActionTypes.CLOSE_CHANGE_LOGIN_POPUP
  constructor() {}
}

class OpenChangePasswordPopup implements Action {
  readonly type = ProfilePageActionTypes.OPEN_CHANGE_PASSWORD_POPUP
  constructor() {}
}

class CloseChangePasswordPopup implements Action {
  readonly type = ProfilePageActionTypes.CLOSE_CHANGE_PASSWORD_POPUP
  constructor() {}
}

class ChangeLogin implements Action {
  readonly type = ProfilePageActionTypes.CHANGE_LOGIN
  constructor(public payload: { newLogin: string }) {}
}

class ChangePassword implements Action {
  readonly type = ProfilePageActionTypes.CHANGE_PASSWORD
  constructor(public payload: { password: string, newPassword: string }) {}
}

class ChangeLoginFailure implements Action {
  readonly type = ProfilePageActionTypes.CHANGE_LOGIN_FAILURE
  constructor(public payload: { errorMessage: string }) {}
}

class ChangeLoginSuccess implements Action {
  readonly type = ProfilePageActionTypes.CHANGE_LOGIN_SUCCESS
  constructor() {}
}

class ChangePasswordFailure implements Action {
  readonly type = ProfilePageActionTypes.CHANGE_PASSWORD_FAILURE
  constructor(public payload: { errorMessage: string }) {}
}

class ChangePasswordSuccess implements Action {
  readonly type = ProfilePageActionTypes.CHANGE_PASSWORD_SUCCESS
  constructor() {}
}

class CloseProfilePage implements Action {
  readonly type = ProfilePageActionTypes.CLOSE_PROFILE_PAGE
  constructor() {}
}

type ProfilePageAction = OpenChangeLoginPopup
  | CloseChangeLoginPopup
  | OpenChangePasswordPopup
  | CloseChangePasswordPopup
  | ChangeLogin
  | ChangePassword
  | ChangeLoginFailure
  | ChangePasswordFailure
  | ChangeLoginSuccess
  | ChangePasswordSuccess
  | CloseProfilePage

export {
  ProfilePageActionTypes,
  OpenChangePasswordPopup,
  CloseChangeLoginPopup,
  OpenChangeLoginPopup,
  CloseChangePasswordPopup,
  ChangeLogin,
  ChangePassword,
  ChangeLoginFailure,
  ChangePasswordFailure,
  ChangeLoginSuccess,
  ChangePasswordSuccess,
  CloseProfilePage,
  ProfilePageAction,
}
