import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state';
import {authStateSelector} from '../../store/selectors/auth.selectors';
import {GetUser, LogOut} from '../../store/actions/auth.actions';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: User | null

  constructor(
    private store: Store<AppState>
  ) {
    this.user = null

    this.store
      .pipe(select(authStateSelector))
      .subscribe((authState) => {
        this.user = authState.user
      })
  }

  ngOnInit(): void {
    this.store.dispatch(new GetUser())
  }

  onLogoutButtonClick(): void {
    this.store.dispatch(new LogOut())
  }
}
