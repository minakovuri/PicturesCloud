import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../../store/state';
import {renameContentPopupSelector} from '../../../../../store/selectors/rename-content-popup.selectors';
import {RenameContent} from '../../../../../store/actions/view-model/rename-content-popup.actions';

@Component({
  selector: 'app-rename-content-modal',
  templateUrl: './rename-content-modal.component.html',
  styleUrls: ['./rename-content-modal.component.css']
})
export class RenameContentModalComponent {
  form: FormGroup
  private contentId: number

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<AppState>
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    })

    this.store
      .pipe(select(renameContentPopupSelector))
      .subscribe((renameContentPopup) => {
        if (renameContentPopup.showPopup)
        {
          this.form.setValue({
            name: renameContentPopup.currentName,
          })
          this.contentId = renameContentPopup.contentId
        }
        else
        {
          this.activeModal.close()
        }
      })
  }

  onClose(): void {
    this.activeModal.close()
  }

  onAccept(): void {
    const newName = this.form.controls.name.value

    this.store.dispatch(new RenameContent({
      newName,
      contentId: this.contentId,
    }))
  }
}
