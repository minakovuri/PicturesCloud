import {AuthAction, AuthActionTypes} from '../actions/auth.actions';

interface SignUpState {
  errorMessage: string | null;
}

const initialState: SignUpState = {
  errorMessage: null,
}

function signUpReducer(state = initialState, action: AuthAction): SignUpState {
  switch (action.type) {
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        errorMessage: null
      }
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
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
  SignUpState,
  signUpReducer,
}
