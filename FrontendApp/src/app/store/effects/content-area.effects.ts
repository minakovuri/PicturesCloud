import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, exhaustMap, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {of} from 'rxjs';

import {AppState} from '../state';
import {ContentManagementService} from '../../services/content-management.service';
import {
  ContentAreaActionTypes,
  PreviewImage,
  DownloadImage,
  DeleteContent, ChangeImageStarred,
} from '../actions/view-model/content-area.actions';
import {ImagePreviewActionTypes, SetPreviewImage} from '../actions/view-model/image-preview.actions';
import {InternalServerError} from '../actions/common.actions';
import {environment} from '../../../environments/environment';
import {RemoveContent, SetImageStarred} from '../actions/contents.actions';

const fileStorageUrl = `${environment.fileStorageConfig.protocol}://${environment.fileStorageConfig.host}:${environment.fileStorageConfig.port}`

function downloadBlobAsFile(blob: Blob, name: string): void {
  const a = document.createElement('a')
  a.href = window.URL.createObjectURL(blob);
  a.download = name

  a.click()

  a.remove()
}

@Injectable()
class ContentAreaEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private contentManagementService: ContentManagementService,
  ) {}

  loadImagePreview$ = createEffect(() =>
    this.actions$.pipe(
      ofType<PreviewImage>(ImagePreviewActionTypes.LOAD_PREVIEW_IMAGE),
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

  deleteContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DeleteContent>(ContentAreaActionTypes.DELETE_CONTENT),
      exhaustMap(action =>
        this.contentManagementService.deleteContent(action.payload.contentId).pipe(
          map(() => new RemoveContent({
            contentId: action.payload.contentId
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

  changeImageStarred$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ChangeImageStarred>(ContentAreaActionTypes.CHANGE_IMAGE_STARRED),
      withLatestFrom(this.store$.select(state => state.selectionState)),
      switchMap(([action, selection]) =>
        this.contentManagementService.changeImageStarred(action.payload.imageId, action.payload.starred).pipe(
          map(() => selection.type === 'all'
              ? new SetImageStarred({
                  imageId: action.payload.imageId,
                  starred: action.payload.starred,
                })
              : new RemoveContent({
                  contentId: action.payload.imageId
                }),
          ),
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

  downloadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DownloadImage>(ContentAreaActionTypes.DOWNLOAD_IMAGE),
      exhaustMap(action =>
        this.contentManagementService.downloadImage(action.payload.imageId).pipe(
          tap(response => {
            switch (response.type) {
              case HttpEventType.Response:
                downloadBlobAsFile(response.body, action.payload.imageName)
                break
              default:
                break
            }
          })
        )
      )
    ),
    {
      dispatch: false
    }
  )
}

export {
  ContentAreaEffects
}
