import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {User} from '../models/User';

interface LoginResponse {
  readonly token: string
}

interface GetUserResponse {
  readonly user: User
}

@Injectable()
class AuthenticationService {
  private urlPrefix = 'api/user'
  private baseUrl = `${environment.backendConfig.protocol}://${environment.backendConfig.host}:${environment.backendConfig.port}/${this.urlPrefix}`

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

  getUser(): Observable<GetUserResponse> {
    const url = this.baseUrl
    return this.http.get<GetUserResponse>(url)
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token)
  }

  deleteToken(): void {
    localStorage.removeItem('token')
  }
}

export {
  AuthenticationService,
}
