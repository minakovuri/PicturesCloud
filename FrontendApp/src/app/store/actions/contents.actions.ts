import { Action } from '@ngrx/store';
import {Content} from '../../models/Content';

enum ContentsActionTypes {
  LOAD_ROOT_CONTENTS = '[Contents] Load Root Contents',
  LOAD_FOLDER_CONTENTS = '[Contents] Load Folder Contents',
  ADD_CONTENTS = '[Contents] Add Contents'
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

class AddContents implements Action {
  readonly type = ContentsActionTypes.ADD_CONTENTS
  constructor(public payload: { contents: Array<Content> }) {}
}

type ContentsAction = LoadRootContents
  | LoadFolderContents
  | AddContents

export {
  LoadRootContents,
  LoadFolderContents,
  AddContents,
  ContentsActionTypes,
  ContentsAction,
}
