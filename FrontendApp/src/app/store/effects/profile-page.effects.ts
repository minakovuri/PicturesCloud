import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../services/authentication.service';
import {
  ChangeLogin, ChangeLoginFailure, ChangeLoginSuccess,
  ChangePassword,
  ChangePasswordFailure,
  ChangePasswordSuccess, CloseChangeLoginPopup, CloseChangePasswordPopup, CloseProfilePage,
  ProfilePageActionTypes
} from '../actions/view-model/profile-page.actions';
import {AppState} from '../state';
import {User} from '../../models/User';
import {SetUser} from '../actions/auth.actions';
import {InternalServerError} from '../actions/common.actions';

@Injectable()
class ProfilePageEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ChangePassword>(ProfilePageActionTypes.CHANGE_PASSWORD),
      exhaustMap((action) =>
        this.authService.changePassword(action.payload.password, action.payload.newPassword).pipe(
          map(() => new ChangePasswordSuccess()),
          catchError(errorResponse => {
            const typedErrorResponse = errorResponse as HttpErrorResponse
            const errorMessage = typedErrorResponse.error.message
            switch (typedErrorResponse.status) {
              case 400:
              case 404:
                return of(new ChangePasswordFailure({errorMessage}))
              case 500:
                return of(new InternalServerError({errorMessage}))
            }
          })
        )
      )
    )
  )

  changeLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ChangeLogin>(ProfilePageActionTypes.CHANGE_LOGIN),
      withLatestFrom(this.store$.select(state => state.authState)),
      switchMap(([action, authState]) =>
        this.authService.changeLogin(action.payload.newLogin).pipe(
          switchMap(() => {
            const updatedUser: User = {
              ...authState.user,
              login: action.payload.newLogin,
            }
            return [
              new ChangeLoginSuccess(),
              new SetUser({
                user: updatedUser,
              })
            ]
          }),
          catchError(errorResponse => {
            const typedErrorResponse = errorResponse as HttpErrorResponse
            const errorMessage = typedErrorResponse.error.message
            switch (typedErrorResponse.status) {
              case 404:
              case 409:
                return of(new ChangeLoginFailure({errorMessage}))
              case 500:
                return of(new InternalServerError({errorMessage}))
            }
          })
        )
      )
    )
  )

  changeLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ChangeLoginSuccess>(ProfilePageActionTypes.CHANGE_LOGIN_SUCCESS),
      map(() => new CloseChangeLoginPopup())
    )
  )

  changePasswordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ChangePasswordSuccess>(ProfilePageActionTypes.CHANGE_PASSWORD_SUCCESS),
      map(() => new CloseChangePasswordPopup())
    )
  )

  closeProfile$ = createEffect(() =>
      this.actions$.pipe(
        ofType<CloseProfilePage>(ProfilePageActionTypes.CLOSE_PROFILE_PAGE),
        tap(() => {
          this.router.navigateByUrl('/')
        }),
      ), {
      dispatch: false
    }
  )
}

export {
  ProfilePageEffects,
}
