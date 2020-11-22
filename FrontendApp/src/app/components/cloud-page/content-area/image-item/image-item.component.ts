import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/state';
import {DownloadImage} from '../../../../store/actions/view-model/content-area.actions';

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

  constructor(private store: Store<AppState>) { }

  onDownloadButtonClick(): void {
    this.store.dispatch(new DownloadImage({
      imageId: this.Id,
      imageName: this.Name,
    }))
  }

  ngOnInit(): void {
  }
}
