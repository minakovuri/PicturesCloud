import {AppState} from '../state';
import {createSelector} from '@ngrx/store';

const authStateSelector = (state: AppState) => state.authState

const authErrorMessageSelector = createSelector(
  authStateSelector,
  (authState) => authState.errorMessage
)

export {
  authErrorMessageSelector,
}
