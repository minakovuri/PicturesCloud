import {Content} from './Content';

export interface Image extends Content {
  readonly Path: string
  readonly Starred: boolean
}
