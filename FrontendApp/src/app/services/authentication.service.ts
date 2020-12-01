import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {User} from '../models/User';
import {environment} from '../../environments/environment';

interface LoginResponse {
  readonly user: User,
  readonly token: string
}

@Injectable()
class AuthenticationService {
  private baseUrl = `${environment.backendConfig.protocol}://${environment.backendConfig.host}:${environment.backendConfig.port}/api`

  constructor(private http: HttpClient) {}

  logIn(login: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}/auth`
    const body = {
      login,
      password,
    }

    return this.http.post<LoginResponse>(url, body)
  }

  signUp(login: string, password: string): Observable<void> {
    const url = `${this.baseUrl}/register`
    const body = {
      login,
      password,
    }

    return this.http.post<void>(url, body)
  }
}

export {
  AuthenticationService,
}
