import {ImagePreviewAction, ImagePreviewActionTypes} from '../actions/view-model/image-preview.actions';

interface ImagePreviewState {
  previewUrl: string,
  showPreview: boolean,
}

const initialState: ImagePreviewState = {
  previewUrl: '',
  showPreview: false,
}

function imagePreviewReducer(state = initialState, action: ImagePreviewAction): ImagePreviewState {
  switch (action.type) {
    case ImagePreviewActionTypes.SET_PREVIEW_IMAGE:
      return {
        previewUrl: action.payload.previewUrl,
        showPreview: true
      }
    case ImagePreviewActionTypes.RESET_PREVIEW_IMAGE:
      return {
        previewUrl: '',
        showPreview: false,
      }
    default: {
      return state
    }
  }
}

export {
  ImagePreviewState,
  imagePreviewReducer,
}
