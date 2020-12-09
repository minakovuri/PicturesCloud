import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/state';
import {AddImage} from '../../../store/actions/view-model/command-panel.actions';
import {selectionStateSelector} from '../../../store/selectors/selection.selectors';
import {FolderState, SelectionState} from '../../../store/reducers/selection.reducer';
import {OpenAllMaterials, OpenFolder} from '../../../store/actions/view-model/selection.actions';
import {OpenPopup} from '../../../store/actions/view-model/create-folder-popup.actions';

function getSectionTitle(selection: SelectionState): string {
  if (selection.type === 'favourites')
  {
    return 'Избранное'
  }
  if (selection.currentFolder)
  {
    return selection.currentFolder.title
  }
  return 'Все материалы'
}

@Component({
  selector: 'app-command-panel',
  templateUrl: './command-panel.component.html',
  styleUrls: ['./command-panel.component.css']
})
export class CommandPanelComponent implements OnInit {
  currentFolder: FolderState|null
  prevFolder: FolderState|null|undefined

  sectionTitle: string
  canCreateContent: boolean

  constructor(
    private store: Store<AppState>
  ) {
    this.currentFolder = null
    this.prevFolder = undefined

    this.canCreateContent = true

    this.store
      .pipe(select(selectionStateSelector))
      .subscribe((selectionState) => {
        if (selectionState.type === 'all')
        {
          this.currentFolder = selectionState.currentFolder
          this.prevFolder = selectionState.prevFolder
        }
        else
        {
          this.canCreateContent = false
        }

        this.sectionTitle = getSectionTitle(selectionState)
      })
  }

  ngOnInit(): void {}

  goBack(): void {
    if (this.prevFolder == null)
    {
      this.store.dispatch(new OpenAllMaterials())
    }
    else
    {
      this.store.dispatch(new OpenFolder({
        folderID: this.prevFolder.id,
        folderName: this.prevFolder.title,
      }))
    }
  }

  onFileInput(event): void {
    const file = event.target.files[0]

    this.store.dispatch(new AddImage({
      file,
      folderId: this.currentFolder.id,
    }))
  }

  onOpenCreateFolderPopup(): void {
    this.store.dispatch(new OpenPopup())
  }
}
