import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

import {LoadFolderContents, LoadFoldersList, LoadRootContents, LoadStarredContents} from '../actions/contents.actions';
import {OpenAllMaterials, OpenFavourites, OpenFolder, SelectionActionTypes} from '../actions/selection.actions';
import {SetAllMaterialsItem, SetFavouritesItem} from '../actions/breadcrumbs.actions';

@Injectable()
class SelectionEffects {
  constructor(
    private actions$: Actions,
  ) {}

  openFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType<OpenFolder>(SelectionActionTypes.OPEN_FOLDER),
      switchMap(({payload}) => [
        new LoadFolderContents(payload),
        new LoadFoldersList({
          folderID: payload.folderID,
        })
      ])
    )
  )

  openAllMaterials$ = createEffect(() =>
    this.actions$.pipe(
      ofType<OpenAllMaterials>(SelectionActionTypes.OPEN_ALL_MATERIALS),
      switchMap(() => [
        new LoadRootContents(),
        new SetAllMaterialsItem(),
      ])
    )
  )

  openFavourites$ = createEffect(() =>
    this.actions$.pipe(
      ofType<OpenFavourites>(SelectionActionTypes.OPEN_FAVOURITES),
      switchMap(() => [
        new LoadStarredContents(),
        new SetFavouritesItem(),
      ])
    )
  )
}

export {
  SelectionEffects,
}
