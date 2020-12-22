import {AppState} from '../state';

const profilePageSelector = (state: AppState) => state.profilePageState

const showChangePasswordPopupSelector = (state: AppState) => state.profilePageState.changePasswordPopup.show
const showChangeLoginPopupSelector = (state: AppState) => state.profilePageState.changeLoginPopup.show

export {
  showChangeLoginPopupSelector,
  showChangePasswordPopupSelector,
  profilePageSelector,
}
