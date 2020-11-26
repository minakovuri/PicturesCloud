import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
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

interface GetContentResponse {
  readonly content: ApiContent
}

interface AddImageResponse {
  readonly contentId: number
  readonly uploadUrl: string
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

  getRootContents(): Observable<GetContentsResponse> {
    const url = `${this.baseUrl}/contents`
    return this.http.get<GetContentsResponse>(url)
  }

  getFolderContents(folderID: number): Observable<GetContentsResponse> {
    const url = `${this.baseUrl}/contents/${folderID}`
    return this.http.get<GetContentsResponse>(url)
  }

  addImage(fileName: string, folderId: number|null): Observable<AddImageResponse> {
    const url = `${this.baseUrl}/image`
    const body = {
      fileName,
      folderId
    }

    return this.http.post<AddImageResponse>(url, body)
  }

  uploadImage(file: File, uploadUrl: string): Observable<any> {
    const url = `${this.baseUrl}/image/upload`

    const formData = new FormData()
    formData.append('image', file)
    formData.append('uploadUrl', uploadUrl)

    return this.http.post<any>(
      url,
      formData,
    )
  }

  getContent(contentId: number): Observable<GetContentResponse> {
    const url = `${this.baseUrl}/content/${contentId}`
    return this.http.get<GetContentResponse>(url)
  }

  downloadImage(imageId: number): Observable<any> {
    const url = `${this.baseUrl}/image/download/${imageId}`
    const req = new HttpRequest( 'GET', url, {
      responseType: 'blob'
    });
    return this.http.request(req);
  }
}

export {
  ContentManagementService,
  ApiDataToModelDataMappers,
}
