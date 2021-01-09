import {RenameContentPopupAction, RenameContentPopupActionTypes} from '../actions/rename-content-popup.actions';

interface RenameContentPopupState {
  showPopup: boolean,
}

const initialState: RenameContentPopupState = {
  showPopup: false,
}

function renameContentPopupReducer(state = initialState, action: RenameContentPopupAction): RenameContentPopupState {
  switch (action.type) {
    case RenameContentPopupActionTypes.OPEN_POPUP:
      return {
        showPopup: true,
      }
    case RenameContentPopupActionTypes.CLOSE_POPUP:
      return {
        showPopup: false,
      }
    default: {
      return state
    }
  }
}

export {
  RenameContentPopupState,
  renameContentPopupReducer,
}
