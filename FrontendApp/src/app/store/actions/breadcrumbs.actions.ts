import {Action} from '@ngrx/store';
import {FolderItem} from '../reducers/breadcrumbs.reducer';

enum BreadcrumbsActionTypes {
  SET_FOLDER_ITEMS = '[Breadcrumbs] Set Folder Items',
  SET_ALL_MATERIALS_ITEM = '[Breadcrumbs] Set All Materials Item',
  SET_FAVOURITES_ITEM = '[Breadcrumbs] Set Favourites Item'
}

class SetFolderItems implements Action {
  readonly type = BreadcrumbsActionTypes.SET_FOLDER_ITEMS
  constructor(public payload: { folderItems: FolderItem[] }) {}
}

class SetAllMaterialsItem implements Action {
  readonly type = BreadcrumbsActionTypes.SET_ALL_MATERIALS_ITEM
  constructor() {}
}

class SetFavouritesItem implements Action {
  readonly type = BreadcrumbsActionTypes.SET_FAVOURITES_ITEM
  constructor() {}
}

type BreadcrumbsAction = SetFolderItems
  | SetAllMaterialsItem
  | SetFavouritesItem

export {
  BreadcrumbsActionTypes,
  BreadcrumbsAction,
  SetAllMaterialsItem,
  SetFavouritesItem,
  SetFolderItems,
}
