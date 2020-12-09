import {RenameContentPopupAction, RenameContentPopupActionTypes} from '../actions/view-model/rename-content-popup.actions';

interface RenameContentPopupState {
  showPopup: boolean,
  contentId: number|null,
  currentName: string
}

const initialState: RenameContentPopupState = {
  showPopup: false,
  contentId: null,
  currentName: '',
}

function renameContentPopupReducer(state = initialState, action: RenameContentPopupAction): RenameContentPopupState {
  switch (action.type) {
    case RenameContentPopupActionTypes.OPEN_POPUP:
      return {
        showPopup: true,
        contentId: action.payload.contentId,
        currentName: action.payload.currentName,
      }
    case RenameContentPopupActionTypes.CLOSE_POPUP:
      return {
        showPopup: false,
        contentId: null,
        currentName: ''
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
