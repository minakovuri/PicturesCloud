import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';

import {AddContents, ContentsActionTypes, LoadRootContents} from '../actions/contents.actions';
import {ContentManagementService} from '../../services/content-management.service';
import {InternalServerError} from '../actions/common.actions';

@Injectable()
class ContentEffects {
  constructor(
    private actions$: Actions,
    private contentManagementService: ContentManagementService,
    private router: Router
  ) {}

  loadRootContents$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadRootContents>(ContentsActionTypes.LOAD_ROOT_CONTENTS),
      exhaustMap(action =>
        this.contentManagementService.getContents().pipe(
          map(response => new AddContents({contents: response.contents})),
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
