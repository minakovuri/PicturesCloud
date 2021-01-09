import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/state';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {createFolderPopupSelector} from '../../../store/selectors/create-folder-popup.selectors';
import {CreateFolder} from '../../../store/actions/create-folder-popup.actions';

@Component({
  selector: 'app-create-folder-modal',
  templateUrl: './create-folder-modal.component.html',
  styleUrls: ['./create-folder-modal.component.css']
})
export class CreateFolderModalComponent {
  form: FormGroup

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<AppState>
  ) {
    this.form = new FormGroup({
     folderName: new FormControl('', Validators.required),
    })

    this.store
      .pipe(select(createFolderPopupSelector))
      .subscribe((createFolderPopup) => {
        if (!createFolderPopup.showPopup)
        {
          this.activeModal.close()
        }
      })
  }

  onClose(): void {
    this.activeModal.close()
  }

  onAccept(): void {
    const folderName = this.form.controls.folderName.value

    this.store.dispatch(new CreateFolder({
      folderName,
    }))
  }
}
