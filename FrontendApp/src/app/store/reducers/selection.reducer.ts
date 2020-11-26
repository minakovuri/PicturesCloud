import {SelectionAction, SelectionActionTypes} from '../actions/view-model/selection.actions';

type SectionType = 'all'|'favourites'

interface FolderState {
  id: number,
  title: string,
}

interface AllMaterialsSectionState {
  type: 'all'
  currentFolder: FolderState|null,
  prevFolder: FolderState|null|undefined,
}

interface FavouritesSectionState {
  type: 'favourites'
}

type SelectionState = AllMaterialsSectionState | FavouritesSectionState

const initialState: SelectionState = {
  type: 'all',
  currentFolder: null,
  prevFolder: undefined
}

function selectionReducer(state = initialState, action: SelectionAction): SelectionState {
  switch (action.type) {
    case SelectionActionTypes.OPEN_ALL_MATERIALS:
      return {
        type: 'all',
        currentFolder: null,
        prevFolder: undefined
      }
    case SelectionActionTypes.OPEN_FAVOURITES: {
      return {
        type: 'favourites'
      }
    }
    case SelectionActionTypes.OPEN_FOLDER:
      if (state.type !== 'all')
      {
        throw Error()
      }
      return {
        type: 'all',
        currentFolder: {
          id: action.payload.folderID,
          title: action.payload.folderName,
        },
        prevFolder: state.currentFolder == null
          ? null
          : {
            id: state.currentFolder.id,
            title: state.currentFolder.title,
          },
      }
    default:
      return state
  }
}

export {
  SectionType,
  FolderState,
  SelectionState,
  selectionReducer,
}
