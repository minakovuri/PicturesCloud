import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {User} from '../models/User';

interface LoginResponse {
  readonly user: User,
  readonly token: string
}

@Injectable()
class AuthenticationService {
  private protocol = 'https'
  private host = 'localhost'
  private port = 5001
  private urlPrefix = 'api/user'

  private baseUrl = `${this.protocol}://${this.host}:${this.port}/${this.urlPrefix}`

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
