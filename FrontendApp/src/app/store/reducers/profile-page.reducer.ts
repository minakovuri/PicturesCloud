import {ProfilePageAction, ProfilePageActionTypes} from '../actions/view-model/profile-page.actions';

interface ProfilePageState {
  changeLoginPopup: {
    show: boolean,
    error: string,
  },
  changePasswordPopup: {
    show: boolean,
    error: string,
  }
}

const initialState: ProfilePageState = {
  changeLoginPopup: {
    show: false,
    error: ''
  },
  changePasswordPopup: {
    show: false,
    error: ''
  }
}

function profilePageReducer(state = initialState, action: ProfilePageAction): ProfilePageState {
  switch (action.type) {
    case ProfilePageActionTypes.OPEN_CHANGE_LOGIN_POPUP:
      return {
        ...state,
        changeLoginPopup: {
          show: true,
          error: '',
        },
      }
    case ProfilePageActionTypes.CLOSE_CHANGE_LOGIN_POPUP:
      return {
        ...state,
        changeLoginPopup: {
          show: false,
          error: '',
        },
      }
    case ProfilePageActionTypes.OPEN_CHANGE_PASSWORD_POPUP:
      return {
        ...state,
        changePasswordPopup: {
          show: true,
          error: ''
        }
      }
    case ProfilePageActionTypes.CLOSE_CHANGE_PASSWORD_POPUP:
      return {
        ...state,
        changePasswordPopup: {
          show: false,
          error: ''
        }
      }
    case ProfilePageActionTypes.CHANGE_LOGIN_FAILURE: {
      return {
        ...state,
        changeLoginPopup: {
          show: true,
          error: action.payload.errorMessage,
        }
      }
    }
    case ProfilePageActionTypes.CHANGE_PASSWORD_FAILURE: {
      return {
        ...state,
        changePasswordPopup: {
          show: true,
          error: action.payload.errorMessage,
        }
      }
    }
    default:
      return state
  }
}

export {
  ProfilePageState,
  profilePageReducer,
}
