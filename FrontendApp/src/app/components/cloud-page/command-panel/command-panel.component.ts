import {Component, ElementRef, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/state';
import {AddImage, OpenProfilePage} from '../../../store/actions/command-panel.actions';
import {selectionStateSelector} from '../../../store/selectors/selection.selectors';
import {FolderState} from '../../../store/reducers/selection.reducer';
import {LogOut} from '../../../store/actions/auth.actions';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateFolderModalComponent} from '../../modals/create-folder-modal/create-folder-modal.component';

@Component({
  selector: 'app-command-panel',
  templateUrl: './command-panel.component.html',
  styleUrls: ['./command-panel.component.css']
})
export class CommandPanelComponent {
  currentFolder: FolderState|null
  canCreateContent: boolean

  @ViewChild('imageInput') imageInputRef: ElementRef

  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal
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

  onFileInput(event): void {
    const file = event.target.files[0]

    this.store.dispatch(new AddImage({
      file,
      folderId: this.currentFolder
        ? this.currentFolder.id
        : null
    }))

    this.imageInputRef.nativeElement.value = ''
  }

  onLogoutButtonClick(): void {
    this.store.dispatch(new LogOut())
  }

  onOpenProfileButtonClick(): void {
    this.store.dispatch(new OpenProfilePage())
  }

  onOpenCreateFolderPopup(): void {
    this.modalService.open(CreateFolderModalComponent, {
      centered: true,
    })
  }
}
