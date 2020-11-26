import {Action} from '@ngrx/store';

enum ContentAreaActionTypes {
  DOWNLOAD_IMAGE = '[Content Area] Download Image',
}

class DownloadImage implements Action {
  readonly type = ContentAreaActionTypes.DOWNLOAD_IMAGE
  constructor(public payload: { imageId: number, imageName: string }) {}
}

export {
  ContentAreaActionTypes,
  DownloadImage,
}
