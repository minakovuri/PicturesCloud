import {Action} from '@ngrx/store';

enum ContentAreaActionTypes {
  DOWNLOAD_IMAGE = '[Content Area] Download Image',
  PREVIEW_IMAGE = '[Content Area] Load Preview Image',
  DELETE_CONTENT = '[Content Area] Delete Content',
  CHANGE_IMAGE_STARRED = '[Content Area] Change Image Starred'
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

class ChangeImageStarred implements Action {
  readonly type = ContentAreaActionTypes.CHANGE_IMAGE_STARRED
  constructor(public payload: { imageId: number, starred: boolean}) {}
}

export {
  ContentAreaActionTypes,
  PreviewImage,
  DownloadImage,
  DeleteContent,
  ChangeImageStarred,
}
