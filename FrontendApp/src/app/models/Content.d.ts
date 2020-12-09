export interface Content {
  readonly Id: number
  readonly Name: string
  readonly FolderId: number|null
  readonly Type: number
  readonly Starred: boolean|undefined,
}
