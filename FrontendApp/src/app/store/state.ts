import {ActionReducerMap} from '@ngrx/store';
import {authReducer, AuthState} from './reducers/auth.reducer';
import {logInReducer, LogInState} from './reducers/log-in.reducer';
import {signUpReducer, SignUpState} from './reducers/sign-up.reducer';
import {contentsReducer, ContentsState} from './reducers/content.reducer';
import {commandPanelReducer, CommandPanelState} from './reducers/command-panel.reducer';
import {selectionReducer, SelectionState} from './reducers/selection.reducer';
import {imagePreviewReducer, ImagePreviewState} from './reducers/image-preview.reducer';
import {createFolderPopupReducer, CreateFolderPopupState} from './reducers/create-folder-popup.reducer';
import {renameContentPopupReducer, RenameContentPopupState} from './reducers/rename-content-popup.reducer';
import {breadcrumbsReducer, BreadcrumbsState} from './reducers/breadcrumbs.reducer';
import {profilePageReducer, ProfilePageState} from './reducers/profile-page.reducer';

interface AppState {
  authState: AuthState; // domainModel
  logInState: LogInState, // viewModel
  signUpState: SignUpState, // viewModel
  contentsState: ContentsState, // domainModel
  commandPanel: CommandPanelState, // viewModel
  selectionState: SelectionState, // viewModel
  imagePreviewState: ImagePreviewState, // viewModel
  createFolderPopupState: CreateFolderPopupState, // viewModel
  renameContentPopupState: RenameContentPopupState, // viewModel,
  breadcrumbsState: BreadcrumbsState, // viewModel
  profilePageState: ProfilePageState, // viewModel
}

const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  logInState: logInReducer,
  signUpState: signUpReducer,
  contentsState: contentsReducer,
  commandPanel: commandPanelReducer,
  selectionState: selectionReducer,
  imagePreviewState: imagePreviewReducer,
  createFolderPopupState: createFolderPopupReducer,
  renameContentPopupState: renameContentPopupReducer,
  breadcrumbsState: breadcrumbsReducer,
  profilePageState: profilePageReducer,
}

export {
  AppState,
  reducers,
}
