import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {exhaustMap, tap} from 'rxjs/operators';
import {HttpEventType} from '@angular/common/http';

import {AppState} from '../state';
import {ContentManagementService} from '../../services/content-management.service';
import {
  ContentAreaActionTypes,
  DownloadImage,
} from '../actions/view-model/content-area.actions';

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
