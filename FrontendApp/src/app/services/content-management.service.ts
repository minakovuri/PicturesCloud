import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Content} from '../models/Content';
import {Observable} from 'rxjs';

interface GetContentsResponse {
  readonly contents: Array<Content>
}

@Injectable()
class ContentManagementService {
  private protocol = 'https'
  private host = 'localhost'
  private port = 5001
  private apiPrefix = 'api'

  private baseUrl = `${this.protocol}://${this.host}:${this.port}/${this.apiPrefix}`

  constructor(private http: HttpClient) {}

  getContents(): Observable<GetContentsResponse> {
    const url = `${this.baseUrl}/contents`
    return this.http.get<GetContentsResponse>(url)
  }

  getFolderContents(folderID: number): Observable<GetContentsResponse> {
    const url = `${this.baseUrl}/contents/${folderID}`
    return this.http.get<GetContentsResponse>(url)
  }
}

export {
  ContentManagementService,
}
