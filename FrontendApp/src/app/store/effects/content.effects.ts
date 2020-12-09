import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';

import {AddContents, ContentsActionTypes, LoadFolderContents, LoadRootContents, LoadStarredContents} from '../actions/contents.actions';
import {ApiDataToModelDataMappers, ContentManagementService} from '../../services/content-management.service';
import {InternalServerError} from '../actions/common.actions';

@Injectable()
class ContentEffects {
  constructor(
    private actions$: Actions,
    private contentManagementService: ContentManagementService,
  ) {}

  loadRootContents$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadRootContents>(ContentsActionTypes.LOAD_ROOT_CONTENTS),
      exhaustMap(action =>
        this.contentManagementService.getRootContents().pipe(
          map(response => new AddContents({
            contents: ApiDataToModelDataMappers.mapApiContentsDataToModelData(response.contents)
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

  loadStarredContents$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadStarredContents>(ContentsActionTypes.LOAD_STARRED_CONTENTS),
      exhaustMap(action =>
        this.contentManagementService.getStarredContents().pipe(
          map(response => new AddContents({
            contents: ApiDataToModelDataMappers.mapApiContentsDataToModelData(response.contents)
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

  loadFolderContents$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadFolderContents>(ContentsActionTypes.LOAD_FOLDER_CONTENTS),
      exhaustMap(action =>
        this.contentManagementService.getFolderContents(action.payload.folderID).pipe(
          map(response => new AddContents({
            contents: ApiDataToModelDataMappers.mapApiContentsDataToModelData(response.contents)
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
  ContentEffects,
}
