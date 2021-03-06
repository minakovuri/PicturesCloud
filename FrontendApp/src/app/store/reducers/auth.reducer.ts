import {AuthAction, AuthActionTypes} from '../actions/auth.actions';
import {User} from '../../models/User';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

function authReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    case AuthActionTypes.SET_USER: {
      return {
        ...state,
        user: action.payload.user,
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
