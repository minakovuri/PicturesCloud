import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/state';
import {ChangeImageStarred, DeleteContent, DownloadImage} from '../../../../store/actions/content-area.actions';
import {PreviewImage} from '../../../../store/actions/content-area.actions';
import {RenameContentModalComponent} from '../../../modals/rename-content-modal/rename-content-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.css']
})
export class ImageItemComponent {
  @Input() Id: number
  @Input() Name: string
  @Input() FolderId: number|null
  @Input() Starred: boolean

  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal
  ) {}

  onPreviewButtonClick(): void {
    this.store.dispatch(new PreviewImage({
      imageId: this.Id,
    }))
  }

  onRenameButtonClick(): void {
    const ref = this.modalService.open(RenameContentModalComponent, {
      centered: true,
    })

    ref.componentInstance.setModalProperties(this.Id, this.Name)
  }

  onChangeStarred(): void {
    this.store.dispatch(new ChangeImageStarred({
      imageId: this.Id,
      starred: !this.Starred,
    }))
  }

  onDownloadButtonClick(): void {
    this.store.dispatch(new DownloadImage({
      imageId: this.Id,
      imageName: this.Name,
    }))
  }

  onDeleteImage(): void {
    this.store.dispatch(new DeleteContent({
      contentId: this.Id,
    }))
  }
}
