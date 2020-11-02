import {ActionReducerMap} from '@ngrx/store';
import {authReducer, AuthState} from './reducers/auth.reducer';

interface AppState {
  authState: AuthState;
}

const reducers: ActionReducerMap<AppState> = {
  authState: authReducer
}

export {
  AppState,
  reducers,
}
