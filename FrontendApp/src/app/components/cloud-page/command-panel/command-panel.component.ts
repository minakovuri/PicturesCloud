import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/state';
import {AddImage} from '../../../store/actions/view-model/command-panel.actions';
import {selectionStateSelector} from '../../../store/selectors/selection.selectors';
import {FolderState} from '../../../store/reducers/selection.reducer';
import {OpenPopup} from '../../../store/actions/view-model/create-folder-popup.actions';

@Component({
  selector: 'app-command-panel',
  templateUrl: './command-panel.component.html',
  styleUrls: ['./command-panel.component.css']
})
export class CommandPanelComponent implements OnInit {
  currentFolder: FolderState|null
  canCreateContent: boolean

  constructor(
    private store: Store<AppState>
  ) {
    this.currentFolder = null
    this.canCreateContent = true

    this.store
      .pipe(select(selectionStateSelector))
      .subscribe((selectionState) => {
        if (selectionState.type === 'all')
        {
          this.currentFolder = selectionState.currentFolder
        }
        else
        {
          this.canCreateContent = false
        }
      })
  }

  ngOnInit(): void {}

  onFileInput(event): void {
    const file = event.target.files[0]

    this.store.dispatch(new AddImage({
      file,
      folderId: this.currentFolder
        ? this.currentFolder.id
        : null
    }))
  }

  onOpenCreateFolderPopup(): void {
    this.store.dispatch(new OpenPopup())
  }
}
