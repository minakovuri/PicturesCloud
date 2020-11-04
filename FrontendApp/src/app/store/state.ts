import {ActionReducerMap} from '@ngrx/store';
import {authReducer, AuthState} from './reducers/auth.reducer';
import {logInReducer, LogInState} from './reducers/log-in.reducer';
import {signUpReducer, SignUpState} from './reducers/sign-up.reducer';

interface AppState {
  authState: AuthState;
  logInState: LogInState,
  signUpState: SignUpState,
}

const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  logInState: logInReducer,
  signUpState: signUpReducer,
}

export {
  AppState,
  reducers,
}
