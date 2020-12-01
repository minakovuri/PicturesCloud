import {Action} from '@ngrx/store';

enum ImagePreviewActionTypes {
  LOAD_PREVIEW_IMAGE = '[Content Area] Load Preview Image',
  SET_PREVIEW_IMAGE = '[Content Area] Set Preview Image',
  RESET_PREVIEW_IMAGE = '[Content Area] Reset Preview Image'
}

class LoadPreviewImage implements Action {
  readonly type = ImagePreviewActionTypes.LOAD_PREVIEW_IMAGE
  constructor(public payload: { imageId: number }) {}
}

class SetPreviewImage implements Action {
  readonly type = ImagePreviewActionTypes.SET_PREVIEW_IMAGE
  constructor(public payload: { previewUrl: string }) {}
}

class ResetPreviewImage implements Action {
  readonly type = ImagePreviewActionTypes.RESET_PREVIEW_IMAGE
  constructor() {}
}

type ImagePreviewAction = LoadPreviewImage
  | SetPreviewImage
  | ResetPreviewImage

export {
  ImagePreviewActionTypes,
  LoadPreviewImage,
  SetPreviewImage,
  ImagePreviewAction,
}
