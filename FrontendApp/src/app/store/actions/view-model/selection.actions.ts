import {Action} from '@ngrx/store';

enum SelectionActionTypes {
  OPEN_FOLDER = '[Selection] Open Folder',
  OPEN_FAVOURITES = '[Selection] Open Favourites',
  OPEN_ALL_MATERIALS = '[Selection] Open All Materials'
}

class OpenFolder implements Action {
  readonly type = SelectionActionTypes.OPEN_FOLDER
  constructor(public payload: { folderID: number, folderName: string }) {}
}

class OpenFavourites implements Action {
  readonly type = SelectionActionTypes.OPEN_FAVOURITES
  constructor() {}
}

class OpenAllMaterials implements Action {
  readonly type = SelectionActionTypes.OPEN_ALL_MATERIALS
  constructor() {}
}

type SelectionAction = OpenFolder
  | OpenFavourites
  | OpenAllMaterials

export {
  SelectionActionTypes,
  SelectionAction,
  OpenFolder,
  OpenFavourites,
  OpenAllMaterials,
}
