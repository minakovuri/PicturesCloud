import {AuthAction, AuthActionTypes} from '../actions/auth.actions';

interface LogInState {
  errorMessage: string | null;
}

const initialState: LogInState = {
  errorMessage: null,
}

function logInReducer(state = initialState, action: AuthAction): LogInState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        errorMessage: null
      }
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        errorMessage: action.payload.errorMessage
      }
    }
    default: {
      return state;
    }
  }
}

export {
  LogInState,
  logInReducer,
}
