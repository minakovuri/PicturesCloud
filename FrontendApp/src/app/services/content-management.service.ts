import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Content} from '../models/Content';

type ApiContent = {
  readonly id: number
  readonly guid: string
  readonly name: string
  readonly folderId: number|null
  readonly type: number
}

interface GetContentsResponse {
  readonly contents: Array<ApiContent>
}

function mapApiContentDataToModelData(apiData: ApiContent): Content {
  return {
    Id: apiData.id,
    Guid: apiData.guid,
    Name: apiData.name,
    FolderId: apiData.folderId,
    Type: apiData.type,
  }
}

function mapApiContentsDataToModelData(apiDataArray: ApiContent[]): Content[] {
  return apiDataArray.map(apiData => mapApiContentDataToModelData(apiData))
}

const ApiDataToModelDataMappers = {
  mapApiContentDataToModelData,
  mapApiContentsDataToModelData,
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
  ApiDataToModelDataMappers,
}
