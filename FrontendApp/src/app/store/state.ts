import {ActionReducerMap} from '@ngrx/store';
import {authReducer, AuthState} from './reducers/auth.reducer';
import {logInReducer, LogInState} from './reducers/log-in.reducer';
import {signUpReducer, SignUpState} from './reducers/sign-up.reducer';
import {contentsReducer, ContentsState} from './reducers/content.reducer';
import {commandPanelReducer, CommandPanelState} from './reducers/command-panel.reducer';

interface AppState {
  authState: AuthState; // domainModel
  logInState: LogInState, // viewModel
  signUpState: SignUpState, // viewModel
  contentsState: ContentsState, // domainModel
  commandPanel: CommandPanelState, // viewModel
}

const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  logInState: logInReducer,
  signUpState: signUpReducer,
  contentsState: contentsReducer,
  commandPanel: commandPanelReducer,
}

export {
  AppState,
  reducers,
}
