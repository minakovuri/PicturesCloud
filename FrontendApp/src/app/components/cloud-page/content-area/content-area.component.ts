import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AppState} from '../../../store/state';
import {Content} from '../../../models/Content';
import {contentsStateSelector} from '../../../store/selectors/content.selectors';
import {ContentTypes} from '../../../models/ContentTypes';
import {imagePreviewSelector} from '../../../store/selectors/image-preview.selectors';
import {PreviewModalComponent} from './preview-modal.component';

const ITEMS_IN_ROW_COUNT = 4

function divideContentsList(contents: Array<Content>): Array<Array<Content>> {
  const tempArray = [];

  for (let index = 0; index < contents.length; index += ITEMS_IN_ROW_COUNT) {
    const myChunk = contents.slice(index, index + ITEMS_IN_ROW_COUNT);
    tempArray.push(myChunk);
  }

  return tempArray;
}

@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  styleUrls: ['./content-area.component.css']
})
export class ContentAreaComponent implements OnInit {
  contents: Array<Array<Content>>

  ContentTypes = ContentTypes

  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal
  ) {
    this.contents = []

    this.store
      .pipe(select(contentsStateSelector))
      .subscribe((contentsState) => {
          this.contents = divideContentsList(contentsState.contents)
       })

    this.store
      .pipe(select(imagePreviewSelector))
      .subscribe((imagePreviewState) => {
        if (imagePreviewState.showPreview)
        {
          const ref = this.modalService.open(PreviewModalComponent, {
            size: 'xl',
            centered: true,
          })
          ref.componentInstance.imageUrl = imagePreviewState.previewUrl
        }
      })
  }

  ngOnInit(): void {
  }
}
