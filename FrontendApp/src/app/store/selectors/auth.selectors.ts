import {AppState} from '../state';

const authStateSelector = (state: AppState) => state.authState

export {
  authStateSelector,
}
