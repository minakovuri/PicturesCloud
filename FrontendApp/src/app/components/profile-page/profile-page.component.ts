import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {User} from '../../models/User';
import {AppState} from '../../store/state';
import {authStateSelector} from '../../store/selectors/auth.selectors';
import {GetUser, LogOut} from '../../store/actions/auth.actions';
import {ChangeLoginModalComponent} from './modals/change-login-modal/change-login-modal.component';
import {
  CloseChangeLoginPopup,
  CloseChangePasswordPopup, CloseProfilePage,
  OpenChangeLoginPopup,
  OpenChangePasswordPopup,
  ProfilePageActionTypes
} from '../../store/actions/profile-page.actions';
import {ChangePasswordModalComponent} from './modals/change-password-modal/change-password-modal.component';
import {Actions, ofType} from '@ngrx/effects';
import {Subscription} from 'rxjs';
import {SubscriptionsComponent} from '../common/subscriptions.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent extends SubscriptionsComponent {
  user: User | null

  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal,
    updates$: Actions
  ) {
    super()

    this.user = null

    this.store
      .pipe(select(authStateSelector))
      .subscribe((authState) => {
        this.user = authState.user
      })

    this.subscriptions.push(updates$.pipe(ofType(ProfilePageActionTypes.OPEN_CHANGE_LOGIN_POPUP))
      .subscribe(() => {
        this.modalService.open(ChangeLoginModalComponent, {
          centered: true
        })
      })
    )

    this.subscriptions.push(updates$.pipe(ofType(ProfilePageActionTypes.OPEN_CHANGE_PASSWORD_POPUP))
      .subscribe(() => {
        this.modalService.open(ChangePasswordModalComponent, {
          centered: true,
        })
      })
    )
  }

  onInit(): void {
    this.store.dispatch(new GetUser())
  }

  onDestroy(): void {
    this.store.dispatch(new CloseChangeLoginPopup())
    this.store.dispatch(new CloseChangePasswordPopup())
  }

  onChangeLoginButtonClick(): void {
    this.store.dispatch(new OpenChangeLoginPopup())
  }

  onChangePasswordButtonClick(): void {
    this.store.dispatch(new OpenChangePasswordPopup())
  }

  onLogoutButtonClick(): void {
    this.store.dispatch(new LogOut())
  }

  onCloseProfile(): void {
    this.store.dispatch(new CloseProfilePage())
  }
}
