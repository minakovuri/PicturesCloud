import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AppState} from '../../../store/state';
import {Content} from '../../../models/Content';
import {contentsStateSelector} from '../../../store/selectors/content.selectors';
import {ContentTypes} from '../../../models/ContentTypes';
import {PreviewModalComponent} from '../../modals/preview-modal/preview-modal.component';
import {ImagePreviewActionTypes, ResetPreviewImage, SetPreviewImage} from '../../../store/actions/image-preview.actions';
import {Actions, ofType} from '@ngrx/effects';
import {SubscriptionsComponent} from '../../common/subscriptions.component';


@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  styleUrls: ['./content-area.component.css']
})
export class ContentAreaComponent extends SubscriptionsComponent {
  contents: Array<Content>

  ContentTypes = ContentTypes

  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal,
    updates$: Actions
  ) {
    super()

    this.contents = []

    this.store
      .pipe(select(contentsStateSelector))
      .subscribe((contentsState) => {
          this.contents = contentsState.contents
       })

    this.subscriptions.push(updates$.pipe(ofType(ImagePreviewActionTypes.SET_PREVIEW_IMAGE))
      .subscribe((action: SetPreviewImage) => {
        const ref = this.modalService.open(PreviewModalComponent, {
          size: 'xl',
          centered: true,
        })
        ref.componentInstance.imageUrl = action.payload.previewUrl
        ref.result.then(() => {}, () => store.dispatch(new ResetPreviewImage()))
      })
    )
  }
}
