import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Content} from '../models/Content';
import {environment} from '../../environments/environment';

type ApiContent = {
  readonly id: number
  readonly name: string
  readonly folderId: number|null
  readonly type: number
  readonly starred: boolean|null
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

interface AddFolderResponse {
  readonly folderId: number
}

interface PreviewImageResponse {
  readonly previewUrl: string
}

function mapApiContentDataToModelData(apiData: ApiContent): Content {
  return {
    Id: apiData.id,
    Name: apiData.name,
    FolderId: apiData.folderId,
    Type: apiData.type,
    Starred: apiData.starred === null
      ? undefined
      : apiData.starred
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
  private baseUrl = `${environment.backendConfig.protocol}://${environment.backendConfig.host}:${environment.backendConfig.port}/api`

  constructor(private http: HttpClient) {}

  getRootContents(): Observable<GetContentsResponse> {
    const url = `${this.baseUrl}/contents`
    return this.http.get<GetContentsResponse>(url)
  }

  getStarredContents(): Observable<GetContentsResponse> {
    const url = `${this.baseUrl}/contents/starred`
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

  addFolder(folderName: string, parentFolderId: number|null): Observable<AddFolderResponse> {
    const url = `${this.baseUrl}/folder`
    const body = {
      folderName,
      parentFolderId,
    }

    return this.http.post<AddFolderResponse>(url, body)
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

  previewImage(imageId: number): Observable<PreviewImageResponse> {
    const url = `${this.baseUrl}/image/preview/${imageId}`
    return this.http.get<PreviewImageResponse>(url)
  }

  getContent(contentId: number): Observable<GetContentResponse> {
    const url = `${this.baseUrl}/content/${contentId}`
    return this.http.get<GetContentResponse>(url)
  }

  renameContent(contentId: number, newName: string): Observable<void> {
    const url = `${this.baseUrl}/content/update`
    const body = {
      contentId,
      newName,
    }

    return this.http.post<void>(url, body)
  }

  changeImageStarred(imageId: number, starred: boolean): Observable<void> {
    const url = `${this.baseUrl}/image/starred`
    const body = {
      imageId,
      starred,
    }

    return this.http.post<void>(url, body)
  }

  downloadImage(imageId: number): Observable<any> {
    const url = `${this.baseUrl}/image/download/${imageId}`
    const req = new HttpRequest( 'GET', url, {
      responseType: 'blob'
    });
    return this.http.request(req);
  }

  deleteContent(contentId: number): Observable<void> {
    const url = `${this.baseUrl}/content/${contentId}`
    return this.http.delete<void>(url)
  }
}

export {
  ContentManagementService,
  ApiDataToModelDataMappers,
}
