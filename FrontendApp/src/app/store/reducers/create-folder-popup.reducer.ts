import {CreateFolderPopupAction, CreateFolderPopupActionTypes} from '../actions/view-model/create-folder-popup.actions';

interface CreateFolderPopupState {
  showPopup: boolean
}

const initialState: CreateFolderPopupState = {
  showPopup: false
}

function createFolderPopupReducer(state = initialState, action: CreateFolderPopupAction): CreateFolderPopupState {
  switch (action.type) {
    case CreateFolderPopupActionTypes.OPEN_POPUP:
      return {
        showPopup: true,
      }
    case CreateFolderPopupActionTypes.CLOSE_POPUP:
      return {
        showPopup: false,
      }
    default: {
      return state
    }
  }
}

export {
  CreateFolderPopupState,
  createFolderPopupReducer,
}
