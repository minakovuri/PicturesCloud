import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '../state';
import {ContentManagementService} from '../../services/content-management.service';
import {ClosePopup, CreateFolder, CreateFolderPopupActionTypes} from '../actions/view-model/create-folder-popup.actions';
import {catchError, switchMap, withLatestFrom} from 'rxjs/operators';
import {GetContent} from '../actions/view-model/command-panel.actions';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {InternalServerError} from '../actions/common.actions';

@Injectable()
class CreateFolderPopupEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private contentManagementService: ContentManagementService,
  ) {}

  createFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CreateFolder>(CreateFolderPopupActionTypes.CREATE_FOLDER),
      withLatestFrom(this.store$.select(state => state.selectionState)),
      switchMap(([action, selection]) => {
        const parentFolderId = selection.type === 'all' && selection.currentFolder
          ? selection.currentFolder.id
          : null
        const folderName = action.payload.folderName

        return this.contentManagementService.addFolder(folderName, parentFolderId).pipe(
          switchMap(response => [
            new GetContent({
              contentId: response.folderId,
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
      })
    )
  )
}

export {
  CreateFolderPopupEffects,
}
