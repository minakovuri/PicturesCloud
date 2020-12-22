import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../store/state';
import {profilePageSelector} from '../../../../store/selectors/profile-page.selectors';
import {ChangeLogin} from '../../../../store/actions/view-model/profile-page.actions';

@Component({
  selector: 'app-change-login-modal',
  templateUrl: './change-login-modal.component.html',
  styleUrls: ['./change-login-modal.component.css']
})
export class ChangeLoginModalComponent {
  form: FormGroup
  errorMessage: string

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<AppState>
  ) {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
    })
    this.errorMessage = ''

    this.store
      .pipe(select(profilePageSelector))
      .subscribe((profilePage) => {
        if (!profilePage.changeLoginPopup.show)
        {
          this.activeModal.close()
        }
        this.errorMessage = profilePage.changeLoginPopup.error
      })
  }

  onClose(): void {
    this.activeModal.close()
  }

  onAccept(): void {
    const newLogin = this.form.controls.login.value

    this.store.dispatch(new ChangeLogin({
      newLogin,
    }))
  }
}
