import { Action } from '@ngrx/store';
import {Content} from '../../models/Content';

enum ContentsActionTypes {
  LOAD_ROOT_CONTENTS = '[Contents] Load Root Contents',
  LOAD_FOLDER_CONTENTS = '[Contents] Load Folder Contents',
  ADD_CONTENTS = '[Contents] Add Contents',
  ADD_CONTENT = '[Contents] Add Content',
  REMOVE_CONTENT = '[Contents] Remove Content',
  UPDATE_CONTENT_NAME = '[Contents] Update Content Name'
}

// возможно этот action стоит вынести в другое место - он не относится к доменным операциям, это операция viewModel-и
class LoadRootContents implements Action {
  readonly type = ContentsActionTypes.LOAD_ROOT_CONTENTS
  constructor() {}
}

// возможно этот action стоит вынести в другое место - он не относится к доменным операциям, это операция viewModel-и
class LoadFolderContents implements Action {
  readonly type = ContentsActionTypes.LOAD_FOLDER_CONTENTS
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

type ContentsAction = LoadRootContents
  | LoadFolderContents
  | AddContents
  | AddContent
  | RemoveContent
  | UpdateContentName

export {
  LoadRootContents,
  LoadFolderContents,
  AddContents,
  AddContent,
  RemoveContent,
  UpdateContentName,
  ContentsActionTypes,
  ContentsAction,
}
