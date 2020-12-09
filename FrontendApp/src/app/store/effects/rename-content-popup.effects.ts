import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

import {AppState} from '../state';
import {ContentManagementService} from '../../services/content-management.service';
import {ClosePopup, RenameContent, RenameContentPopupActionTypes} from '../actions/view-model/rename-content-popup.actions';
import {InternalServerError} from '../actions/common.actions';
import {UpdateContentName} from '../actions/contents.actions';

@Injectable()
class RenameContentPopupEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private contentManagementService: ContentManagementService,
  ) {}

  renameContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RenameContent>(RenameContentPopupActionTypes.RENAME_CONTENT),
      switchMap(action =>
        this.contentManagementService.renameContent(action.payload.contentId, action.payload.newName).pipe(
          switchMap(response => [
            new UpdateContentName({
              contentId: action.payload.contentId,
              newName: action.payload.newName,
            }),
            new ClosePopup()
          ]),
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
  RenameContentPopupEffects,
}
