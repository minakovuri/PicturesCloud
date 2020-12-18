import {Actions, createEffect, ofType} from '@ngrx/effects';
import { Router } from '@angular/router';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

import {AuthenticationService} from '../../services/authentication.service';
import {AuthActionTypes, GetUser, LogIn, LogInFailure, LogInSuccess, LogOut, SetUser} from '../actions/auth.actions';
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
          map(response => new LogInSuccess({
            token: response.token,
          })),
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
      )
    )
  )

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetUser>(AuthActionTypes.GET_USER),
      exhaustMap(() =>
        this.authService.getUser().pipe(
          map(response => new SetUser({
            user: response.user
          })),
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
      )
    )
  )

  logInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LogInSuccess>(AuthActionTypes.LOGIN_SUCCESS),
      tap(({payload}) => {
        this.authService.saveToken(payload.token)
        this.router.navigateByUrl('/')
      })
    ),
    {
      dispatch: false
    }
  )

  logInFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LogInFailure>(AuthActionTypes.LOGIN_FAILURE),
      tap(({payload}) => {
        console.error(payload.errorMessage)
      })
    ),
    {
      dispatch: false
    }
  )

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LogOut>(AuthActionTypes.LOGOUT),
      tap(() => {
        this.authService.deleteToken()
        this.router.navigateByUrl('/login')
      })
    ), {
    dispatch: false,
  })
}

export {
  LogInEffects
}
