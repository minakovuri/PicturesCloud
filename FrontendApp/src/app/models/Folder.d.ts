import {ContentType} from './ContentType';

export interface Folder {
  readonly Id: number
  readonly Guid: string
  readonly Name: string
  readonly FolderId: number|null
  readonly Type: ContentType
}
