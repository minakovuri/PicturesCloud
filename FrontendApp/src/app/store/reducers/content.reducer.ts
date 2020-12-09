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
    case ContentsActionTypes.ADD_CONTENT: {
      return {
        contents: state.contents.concat(action.payload.content)
      }
    }
    case ContentsActionTypes.ADD_CONTENTS: {
      return {
        contents: [...action.payload.contents],
      }
    }
    case ContentsActionTypes.REMOVE_CONTENT:  {
      return {
        contents: state.contents.filter(content => content.Id !== action.payload.contentId)
      }
    }
    case ContentsActionTypes.UPDATE_CONTENT_NAME: {
      const content = state.contents.find(x => x.Id === action.payload.contentId)
      const updatedContent = {
        ...content,
        Name: action.payload.newName,
      }

      const updatedContentIndex = state.contents.findIndex(x => x.Id === action.payload.contentId)
      const itemsBeforeUpdatedContent = state.contents.slice(0, updatedContentIndex)
      const itemsAfterUpdatedContent = state.contents.slice(updatedContentIndex + 1)

      return {
        contents: [
          ...itemsBeforeUpdatedContent,
          updatedContent,
          ...itemsAfterUpdatedContent,
        ]
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
