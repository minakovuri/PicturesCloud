import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/state';
import {OpenFolder} from '../../../../store/actions/selection.actions';
import {DeleteContent} from '../../../../store/actions/content-area.actions';
import {RenameContentModalComponent} from '../../../modals/rename-content-modal/rename-content-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-folder-item',
  templateUrl: './folder-item.component.html',
  styleUrls: ['./folder-item.component.css']
})
export class FolderItemComponent {
  @Input() Id: number
  @Input() Name: string
  @Input() FolderId: number|null

  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal
  ) { }

  onDeleteFolder(): void {
    this.store.dispatch(new DeleteContent({
      contentId: this.Id,
    }))
  }

  onRenameButtonClick(): void {
    const ref = this.modalService.open(RenameContentModalComponent, {
      centered: true,
    })

    ref.componentInstance.setModalProperties(this.Id, this.Name)
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
