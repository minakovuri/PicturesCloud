import {CommandPanelAction, CommandPanelActionTypes} from '../actions/view-model/command-panel.actions';

interface CommandPanelState {
  uploadedImage: File | null
}

const initialState: CommandPanelState = {
  uploadedImage: null
}

function commandPanelReducer(state = initialState, action: CommandPanelAction): CommandPanelState {
  switch (action.type) {
    case CommandPanelActionTypes.ADD_IMAGE: {
      return {
        uploadedImage: action.payload.file
      }
    }
    case CommandPanelActionTypes.CLEAR_AFTER_UPLOAD: {
      return {
        uploadedImage: null
      }
    }
    default: {
      return state
    }
  }
}

export {
  CommandPanelState,
  commandPanelReducer,
}
