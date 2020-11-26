import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/state';
import {OpenFolder} from '../../../../store/actions/view-model/selection.actions';

@Component({
  selector: 'app-folder-item',
  templateUrl: './folder-item.component.html',
  styleUrls: ['./folder-item.component.css']
})
export class FolderItemComponent implements OnInit {
  @Input() Id: number
  @Input() Guid: string
  @Input() Name: string
  @Input() FolderId: number|null

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {}

  preventClick(event): void {
    event.preventDefault()
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
