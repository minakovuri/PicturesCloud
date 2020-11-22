import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
class TokenService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token')
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    })

    return next.handle(request).pipe(
      tap(
        () => {},
        (error: HttpErrorResponse) => {
          if (error.status === 401)
          {
            this.router.navigate(['login'])
          }
        }
      )
    );
  }
}

const TokenProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenService,
  multi: true
}

export {
  TokenProvider,
}
