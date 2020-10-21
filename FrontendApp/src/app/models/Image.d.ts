import {ContentType} from './ContentType';

export interface Image {
  readonly Id: number
  readonly Guid: string
  readonly Name: string
  readonly FolderId: number|null
  readonly Type: ContentType
  readonly Path: string
  readonly Starred: boolean
}
