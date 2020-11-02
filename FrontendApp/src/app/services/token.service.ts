import {Injectable, Injector} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
class TokenService implements HttpInterceptor{
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token')
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request);
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
