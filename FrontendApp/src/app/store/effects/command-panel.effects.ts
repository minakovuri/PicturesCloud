import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {exhaustMap, map, withLatestFrom, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import {
  AddImage,
  ClearUploadedFileData,
  CommandPanelActionTypes,
  GetContent,
  UploadImage
} from '../actions/view-model/command-panel.actions';
import {ApiDataToModelDataMappers, ContentManagementService} from '../../services/content-management.service';
import {AppState} from '../state';
import {AddContent} from '../actions/contents.actions';

@Injectable()
class CommandPanelEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private contentManagementService: ContentManagementService,
  ) {}

  addImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType<AddImage>(CommandPanelActionTypes.ADD_IMAGE),
      exhaustMap(action =>
        this.contentManagementService.addImage(action.payload.file.name, action.payload.folderId).pipe(
          map(response => new UploadImage({
            contentId: response.contentId,
            uploadUrl: response.uploadUrl,
          })),
        )
      )
    )
  )

  uploadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType<UploadImage>(CommandPanelActionTypes.UPLOAD_IMAGE),
      withLatestFrom(this.store$.select(state => state.commandPanel)),
      switchMap(([action, commandPanel]) =>
        this.contentManagementService.uploadImage(commandPanel.uploadedImage, action.payload.uploadUrl).pipe(
          map(() => new GetContent({
            contentId: action.payload.contentId,
          }))
        )
      )
    )
  )

  getContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetContent>(CommandPanelActionTypes.GET_CONTENT),
      switchMap(action =>
        this.contentManagementService.getContent(action.payload.contentId).pipe(
          switchMap(response => [
            new AddContent({
              content: ApiDataToModelDataMappers.mapApiContentDataToModelData(response.content)
            }),
            new ClearUploadedFileData()
          ])
        )
      )
    )
  )
}

export {
  CommandPanelEffects,
}
