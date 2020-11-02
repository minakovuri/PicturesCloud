import {AuthAction, AuthActionTypes} from '../actions/auth.actions';
import {User} from '../../models/User';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
}

function authReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE:
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
    }
    default: {
      return state;
    }
  }
}

export {
  AuthState,
  authReducer,
}
