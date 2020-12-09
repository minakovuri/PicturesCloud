import {Action} from '@ngrx/store';

enum CommandPanelActionTypes {
  ADD_IMAGE = '[Command Panel] Add Image',
  UPLOAD_IMAGE = '[Command Panel] Upload Image',
  CREATE_FOLDER = '[Command Panel] Create Folder',
  GET_CONTENT = '[Command Panel] Get Content',
  CLEAR_AFTER_UPLOAD = '[Command Panel] Clear Data After Upload'
}

class AddImage implements Action {
  readonly type = CommandPanelActionTypes.ADD_IMAGE
  constructor(public payload: { file: File, folderId: number|null }) {}
}

class UploadImage implements Action {
  readonly type = CommandPanelActionTypes.UPLOAD_IMAGE
  constructor(public payload: { contentId: number, uploadUrl: string }) {}
}

class GetContent implements Action {
  readonly type = CommandPanelActionTypes.GET_CONTENT
  constructor(public payload: { contentId: number }) {}
}

class ClearUploadedFileData implements Action {
  readonly type = CommandPanelActionTypes.CLEAR_AFTER_UPLOAD
  constructor() {}
}

class CreateFolder implements Action {
  readonly type = CommandPanelActionTypes.CREATE_FOLDER
  constructor() {}
}

type CommandPanelAction = AddImage
  | UploadImage
  | GetContent
  | ClearUploadedFileData
  | CreateFolder

export {
  AddImage,
  UploadImage,
  GetContent,
  ClearUploadedFileData,
  CommandPanelActionTypes,
  CommandPanelAction,
}
