import {Action} from '@ngrx/store';

const InternalServerErrorType = '[Common] Internal server error'

class InternalServerError implements Action {
  readonly type = InternalServerErrorType
  constructor(public payload: {errorMessage: string}) {}
}

export {
  InternalServerErrorType,
  InternalServerError,
}
