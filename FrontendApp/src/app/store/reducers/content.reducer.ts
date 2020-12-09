import {Content} from '../../models/Content';
import {ContentsAction, ContentsActionTypes} from '../actions/contents.actions';

interface ContentsState {
  contents: Array<Content>
}

const initialState: ContentsState = {
  contents: [],
}

function _updateContent(contentId: number, contents: Content[], content: Content): Content[] {
  const updatedContentIndex = contents.findIndex(x => x.Id === contentId)
  const itemsBeforeUpdatedContent = contents.slice(0, updatedContentIndex)
  const itemsAfterUpdatedContent = contents.slice(updatedContentIndex + 1)

  return [
    ...itemsBeforeUpdatedContent,
    content,
    ...itemsAfterUpdatedContent,
  ]
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

      return {
        contents: _updateContent(action.payload.contentId, state.contents, updatedContent)
      }
    }
    case ContentsActionTypes.SET_IMAGE_STARRED: {
      const content = state.contents.find(x => x.Id === action.payload.imageId)
      const updatedContent = {
        ...content,
        Starred: action.payload.starred,
      }

      return {
        contents: _updateContent(action.payload.imageId, state.contents, updatedContent)
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
