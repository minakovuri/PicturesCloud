import {Actions, createEffect, ofType} from '@ngrx/effects';
import { Router } from '@angular/router';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

import {AuthenticationService} from '../../services/authentication.service';
import {AuthActionTypes, LogIn, LogInFailure, LogInSuccess} from '../actions/auth.actions';
import {InternalServerError} from '../actions/common.actions';

@Injectable()
class LogInEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LogIn>(AuthActionTypes.LOGIN),
      exhaustMap(action =>
        this.authService.logIn(action.payload.login, action.payload.password).pipe(
          map(response => new LogInSuccess({token: response.Token, user: response.User})),
          catchError(errorResponse => {
            const typedErrorResponse = errorResponse as HttpErrorResponse
            const errorMessage = typedErrorResponse.error.message
            switch (typedErrorResponse.status) {
              case 404:
              case 400:
                return of(new LogInFailure({errorMessage}))
              case 500:
                return of(new InternalServerError({errorMessage}))
            }
          })
        )
    ))
  )

  logInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LogInSuccess>(AuthActionTypes.LOGIN_SUCCESS),
      tap(({payload}) => {
        localStorage.setItem('token', payload.token)
        this.router.navigateByUrl('/')
      })
    ),
    {
      dispatch: false
    }
  )

  logInFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LogInFailure>(AuthActionTypes.LOGIN_SUCCESS),
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
  LogInEffects
}
