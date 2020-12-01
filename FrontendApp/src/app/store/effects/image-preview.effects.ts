import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '../state';
import {ContentManagementService} from '../../services/content-management.service';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ImagePreviewActionTypes, LoadPreviewImage, SetPreviewImage} from '../actions/view-model/image-preview.actions';
import {of} from 'rxjs';
import {InternalServerError} from '../actions/common.actions';
import {environment} from '../../../environments/environment';

const fileStorageUrl = `${environment.fileStorageConfig.protocol}://${environment.fileStorageConfig.host}:${environment.fileStorageConfig.port}`

@Injectable()
class ImagePreviewEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private contentManagementService: ContentManagementService,
  ) {}

  loadImagePreview$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadPreviewImage>(ImagePreviewActionTypes.LOAD_PREVIEW_IMAGE),
      exhaustMap(action =>
        this.contentManagementService.previewImage(action.payload.imageId).pipe(
          map(response => new SetPreviewImage({
            previewUrl: `${fileStorageUrl}/${response.previewUrl}`
          })),
          catchError(response => {
            if (response instanceof HttpErrorResponse) {
              const errorMessage = response.error.message
              return of(new InternalServerError({errorMessage}))
            }
          })
        )
      )
    )
  )
}

export {
  ImagePreviewEffects,
}
