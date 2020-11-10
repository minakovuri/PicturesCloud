import {Content} from '../../models/Content';
import {ContentsAction, ContentsActionTypes} from '../actions/contents.actions';

interface ContentsState {
  contents: Array<Content>
}

const initialState: ContentsState = {
  contents: [],
}

function contentsReducer(state = initialState, action: ContentsAction): ContentsState {
  switch (action.type) {
    case ContentsActionTypes.ADD_CONTENTS: {
      return {
        contents: [...action.payload.contents],
      }
    }
    default: {
      return state
    }
  }
}

export {
  ContentsState,
  contentsReducer,
}
