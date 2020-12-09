import {Action} from '@ngrx/store';

enum ContentAreaActionTypes {
  DOWNLOAD_IMAGE = '[Content Area] Download Image',
  PREVIEW_IMAGE = '[Content Area] Load Preview Image',
  DELETE_CONTENT = '[Content Area] Delete Content'
}

class PreviewImage implements Action {
  readonly type = ContentAreaActionTypes.PREVIEW_IMAGE
  constructor(public payload: { imageId: number }) {}
}

class DownloadImage implements Action {
  readonly type = ContentAreaActionTypes.DOWNLOAD_IMAGE
  constructor(public payload: { imageId: number, imageName: string }) {}
}

class DeleteContent implements Action {
  readonly type = ContentAreaActionTypes.DELETE_CONTENT
  constructor(public payload: { contentId: number}) {}
}

export {
  ContentAreaActionTypes,
  PreviewImage,
  DownloadImage,
  DeleteContent,
}
