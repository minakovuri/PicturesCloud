import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

import {LoadFolderContents, LoadRootContents, LoadStarredContents} from '../actions/contents.actions';
import {OpenAllMaterials, OpenFavourites, OpenFolder, SelectionActionTypes} from '../actions/view-model/selection.actions';

@Injectable()
class SelectionEffects {
  constructor(
    private actions$: Actions,
  ) {}

  openFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType<OpenFolder>(SelectionActionTypes.OPEN_FOLDER),
      map(({payload}) => new LoadFolderContents(payload))
    )
  )

  openAllMaterials$ = createEffect(() =>
    this.actions$.pipe(
      ofType<OpenAllMaterials>(SelectionActionTypes.OPEN_ALL_MATERIALS),
      map(() => new LoadRootContents())
    )
  )

  openFavourites$ = createEffect(() =>
    this.actions$.pipe(
      ofType<OpenFavourites>(SelectionActionTypes.OPEN_FAVOURITES),
      map(() => new LoadStarredContents())
    )
  )
}

export {
  SelectionEffects,
}
