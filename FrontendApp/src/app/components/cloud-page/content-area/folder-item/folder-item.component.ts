import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/state';
import {OpenFolder} from '../../../../store/actions/view-model/selection.actions';
import {DeleteContent} from '../../../../store/actions/view-model/content-area.actions';
import {OpenPopup} from '../../../../store/actions/view-model/rename-content-popup.actions';

@Component({
  selector: 'app-folder-item',
  templateUrl: './folder-item.component.html',
  styleUrls: ['./folder-item.component.css']
})
export class FolderItemComponent implements OnInit {
  @Input() Id: number
  @Input() Name: string
  @Input() FolderId: number|null

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {}

  onDeleteFolder(): void {
    this.store.dispatch(new DeleteContent({
      contentId: this.Id,
    }))
  }

  onRenameButtonClick(): void {
    this.store.dispatch(new OpenPopup({
      currentName: this.Name,
      contentId: this.Id,
    }))
  }

  openFolder(event): void {
    if (event.defaultPrevented)
    {
      return
    }

    this.store.dispatch(new OpenFolder({
      folderID: this.Id,
      folderName: this.Name,
    }))
  }

}
