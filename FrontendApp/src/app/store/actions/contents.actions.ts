import { Action } from '@ngrx/store';
import {Content} from '../../models/Content';

enum ContentsActionTypes {
  LOAD_ROOT_CONTENTS = '[Contents] Load Root Contents',
  LOAD_FOLDER_CONTENTS = '[Contents] Load Folder Contents',
  LOAD_STARRED_CONTENTS = '[Contents] Load Starred Contents',
  LOAD_FOLDERS_LIST = '[Contents] Load Folders List',
  ADD_CONTENTS = '[Contents] Add Contents',
  ADD_CONTENT = '[Contents] Add Content',
  REMOVE_CONTENT = '[Contents] Remove Content',
  UPDATE_CONTENT_NAME = '[Contents] Update Content Name',
  SET_IMAGE_STARRED = '[Contents] Set Image Starred',
}

// возможно этот action стоит вынести в другое место - он не относится к доменным операциям, это операция viewModel-и
class LoadRootContents implements Action {
  readonly type = ContentsActionTypes.LOAD_ROOT_CONTENTS
  constructor() {}
}

// возможно этот action стоит вынести в другое место - он не относится к доменным операциям, это операция viewModel-и
class LoadStarredContents implements Action  {
  readonly type = ContentsActionTypes.LOAD_STARRED_CONTENTS
  constructor() {}
}

// возможно этот action стоит вынести в другое место - он не относится к доменным операциям, это операция viewModel-и
class LoadFolderContents implements Action {
  readonly type = ContentsActionTypes.LOAD_FOLDER_CONTENTS
  constructor(public payload: { folderID: number }) {}
}

// возможно этот action стоит вынести в другое место - он не относится к доменным операциям, это операция viewModel-и
class LoadFoldersList implements Action {
  readonly type  = ContentsActionTypes.LOAD_FOLDERS_LIST
  constructor(public payload: { folderID: number }) {}
}

class AddContent implements Action {
  readonly type = ContentsActionTypes.ADD_CONTENT
  constructor(public payload: {content: Content}) {}
}

class AddContents implements Action {
  readonly type = ContentsActionTypes.ADD_CONTENTS
  constructor(public payload: { contents: Array<Content> }) {}
}

class RemoveContent implements Action {
  readonly type = ContentsActionTypes.REMOVE_CONTENT
  constructor(public payload: { contentId: number}) {}
}

class UpdateContentName implements Action {
  readonly type = ContentsActionTypes.UPDATE_CONTENT_NAME
  constructor(public payload: { contentId: number, newName: string }) {}
}

class SetImageStarred implements Action {
  readonly type = ContentsActionTypes.SET_IMAGE_STARRED
  constructor(public payload: { imageId: number, starred: boolean }) {}
}

type ContentsAction = AddContents
  | AddContent
  | RemoveContent
  | UpdateContentName
  | SetImageStarred

export {
  LoadRootContents, // Это по-хоррошему надо вынести в отдельный модуль
  LoadFolderContents, // Это по-хоррошему надо вынести в отдельный модуль
  LoadStarredContents, // Это по-хоррошему надо вынести в отдельный модуль
  LoadFoldersList, // Это по-хоррошему надо вынести в отдельный модуль
  AddContents,
  AddContent,
  RemoveContent,
  UpdateContentName,
  SetImageStarred,
  ContentsActionTypes,
  ContentsAction,
}
