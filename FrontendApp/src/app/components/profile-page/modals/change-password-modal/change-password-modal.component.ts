import { Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../store/state';
import {profilePageSelector} from '../../../../store/selectors/profile-page.selectors';
import {ChangePassword} from '../../../../store/actions/profile-page.actions';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent{
  form: FormGroup

  hideCurrentPassword: boolean
  hideNewPassword: boolean
  errorMessage: string

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<AppState>
  ) {
    this.form = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
    })

    this.hideCurrentPassword = true
    this.hideNewPassword = true
    this.errorMessage = ''

    this.store
      .pipe(select(profilePageSelector))
      .subscribe((profilePage) => {
        if (!profilePage.changePasswordPopup.show)
        {
          this.activeModal.close()
        }
        this.errorMessage = profilePage.changePasswordPopup.error
      })
  }

  onChangeCurrentPasswordVisibility(): void {
    this.hideCurrentPassword = !this.hideCurrentPassword
  }

  onChangeNewPasswordVisibility(): void {
    this.hideNewPassword = !this.hideNewPassword
  }

  onClose(): void {
    this.activeModal.close()
  }

  onAccept(): void {
    const password = this.form.controls.currentPassword.value
    const newPassword = this.form.controls.newPassword.value

    this.store.dispatch(new ChangePassword({
      password,
      newPassword,
    }))
  }
}
