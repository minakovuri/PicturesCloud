declare enum ContentType {
  Folder,
  Image
}

export interface Content {
  readonly Id: number
  readonly Guid: string
  readonly Name: string
  readonly FolderId: number|null
  readonly Type: ContentType
}
