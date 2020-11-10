import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';

import {AuthenticationService} from '../../services/authentication.service';
import {AuthActionTypes, LogIn, SignUp, SignUpFailure, SignUpSuccess} from '../actions/auth.actions';
import {InternalServerError} from '../actions/common.actions';

@Injectable()
class SignUpEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
  ) {}

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SignUp>(AuthActionTypes.SIGNUP),
      exhaustMap(action =>
        this.authService.signUp(action.payload.login, action.payload.password).pipe(
          map(() => new SignUpSuccess({
            login: action.payload.login,
            password: action.payload.password,
          })),
          catchError(errorResponse => {
            const typedErrorResponse = errorResponse as HttpErrorResponse
            const errorMessage = typedErrorResponse.error.message
            switch (typedErrorResponse.status) {
              case 400:
              case 409:
                return of(new SignUpFailure({errorMessage}))
              case 500:
                return of(new InternalServerError({errorMessage}))
            }
          })
        ))
    )
  )

  signUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SignUpSuccess>(AuthActionTypes.SIGNUP_SUCCESS),
      map(({payload}) => new LogIn(payload))
    )
  )

  signUpFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType<SignUpFailure>(AuthActionTypes.SIGNUP_FAILURE),
        tap(({payload}) => {
          console.error(payload.errorMessage)
        })
      ),
    {
      dispatch: false
    }
  )
}

export {
  SignUpEffects,
}
