import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/state';
import {DownloadImage} from '../../../../store/actions/view-model/content-area.actions';
import {LoadPreviewImage} from '../../../../store/actions/view-model/image-preview.actions';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.css']
})
export class ImageItemComponent implements OnInit {
  @Input() Id: number
  @Input() Guid: string
  @Input() Name: string
  @Input() FolderId: number|null

  constructor(
    private store: Store<AppState>,
  ) {}

  onPreviewButtonClick(): void {
    this.store.dispatch(new LoadPreviewImage({
      imageId: this.Id,
    }))
  }

  onDownloadButtonClick(): void {
    this.store.dispatch(new DownloadImage({
      imageId: this.Id,
      imageName: this.Name,
    }))
  }

  ngOnInit(): void {
  }
}
