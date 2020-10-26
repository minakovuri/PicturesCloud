import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from '../models/User';
import {Observable} from 'rxjs';

interface LoginResponse {
  readonly User: User,
  readonly Token: string
}

@Injectable()
class AuthenticationService {
  private protocol = 'http'
  private host = 'localhost'
  private port = 2000
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
