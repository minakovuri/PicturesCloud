import {Action} from '@ngrx/store';

enum RenameContentPopupActionTypes {
  OPEN_POPUP = '[Rename Content Popup] Open Popup',
  CLOSE_POPUP = '[Rename Content Popup] Close Popup',
  RENAME_CONTENT = '[Rename Content Popup] Rename Content'
}

class OpenPopup implements Action {
  readonly type = RenameContentPopupActionTypes.OPEN_POPUP
  constructor(public payload: { contentId: number, currentName: string }) {}
}

class ClosePopup implements Action {
  readonly type = RenameContentPopupActionTypes.CLOSE_POPUP
  constructor() {}
}

class RenameContent implements Action {
  readonly type = RenameContentPopupActionTypes.RENAME_CONTENT
  constructor(public payload: { contentId: number, newName: string }) {}
}

type RenameContentPopupAction = OpenPopup
  | ClosePopup
  | RenameContent

export {
  RenameContentPopupActionTypes,
  OpenPopup,
  ClosePopup,
  RenameContent,
  RenameContentPopupAction,
}
