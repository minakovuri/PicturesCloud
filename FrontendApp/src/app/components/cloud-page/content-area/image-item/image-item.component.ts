import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/state';
import {ChangeImageStarred, DeleteContent, DownloadImage} from '../../../../store/actions/view-model/content-area.actions';
import {PreviewImage} from '../../../../store/actions/view-model/content-area.actions';
import {OpenPopup} from '../../../../store/actions/view-model/rename-content-popup.actions';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.css']
})
export class ImageItemComponent implements OnInit {
  @Input() Id: number
  @Input() Name: string
  @Input() FolderId: number|null
  @Input() Starred: boolean

  constructor(
    private store: Store<AppState>,
  ) {}

  onPreviewButtonClick(): void {
    this.store.dispatch(new PreviewImage({
      imageId: this.Id,
    }))
  }

  onRenameButtonClick(): void {
    this.store.dispatch(new OpenPopup({
      currentName: this.Name,
      contentId: this.Id,
    }))
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

  ngOnInit(): void {
  }
}
