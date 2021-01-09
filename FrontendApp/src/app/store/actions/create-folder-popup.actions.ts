import {Action} from '@ngrx/store';

enum CreateFolderPopupActionTypes {
  OPEN_POPUP = '[Create Folder Popup] Open Popup',
  CLOSE_POPUP = '[Create Folder Popup] Close Popup',
  CREATE_FOLDER = '[Create Folder Popup] Create Folder'
}

class OpenPopup implements Action {
  readonly type = CreateFolderPopupActionTypes.OPEN_POPUP
  constructor() {}
}

class ClosePopup implements Action {
  readonly type = CreateFolderPopupActionTypes.CLOSE_POPUP
  constructor() {}
}

class CreateFolder implements Action {
  readonly type = CreateFolderPopupActionTypes.CREATE_FOLDER
  constructor(public payload: { folderName: string}) {}
}

type CreateFolderPopupAction = OpenPopup
  | ClosePopup
  | CreateFolder

export {
  CreateFolderPopupActionTypes,
  OpenPopup,
  ClosePopup,
  CreateFolder,
  CreateFolderPopupAction,
}
