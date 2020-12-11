import {SectionType} from './selection.reducer';
import {BreadcrumbsAction, BreadcrumbsActionTypes} from '../actions/view-model/breadcrumbs.actions';

function _getSectionTitle(type: SectionType): string {
  if (type === 'favourites')
  {
    return 'Избранное'
  }
  return 'Все материалы'
}

interface SectionItem {
  type: SectionType
  name: string
}

interface FolderItem {
  type: 'folder',
  name: string,
  id: number,
}

type BreadcrumbsItem = SectionItem | FolderItem

interface BreadcrumbsState {
  items: BreadcrumbsItem[]
}

const initialState: BreadcrumbsState = {
  items: []
}

function breadcrumbsReducer(state = initialState, action: BreadcrumbsAction): BreadcrumbsState {
  switch (action.type) {
    case BreadcrumbsActionTypes.SET_ALL_MATERIALS_ITEM:
      return {
        items: [
          {
            type: 'all',
            name: _getSectionTitle('all'),
          },
        ]
      }
    case BreadcrumbsActionTypes.SET_FAVOURITES_ITEM:
      return {
        items: [
          {
            type: 'favourites',
            name: _getSectionTitle('favourites'),
          },
        ]
      }
    case BreadcrumbsActionTypes.SET_FOLDER_ITEMS:
      return {
        items: [
          {
            type: 'all',
            name: _getSectionTitle('all'),
          },
          ...action.payload.folderItems
        ]
      }
    default: {
      return state
    }
  }
}

export {
  BreadcrumbsItem,
  FolderItem,
  BreadcrumbsState,
  breadcrumbsReducer,
}
