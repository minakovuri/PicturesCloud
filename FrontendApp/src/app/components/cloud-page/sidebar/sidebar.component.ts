import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';

import {AppState} from '../../../store/state';
import {OpenAllMaterials, OpenFavourites} from '../../../store/actions/selection.actions';
import {SelectionState} from '../../../store/reducers/selection.reducer';
import {selectionStateSelector} from '../../../store/selectors/selection.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  selectionState: SelectionState

  constructor(
    private store: Store<AppState>
  ) {
    this.store
      .pipe(select(selectionStateSelector))
      .subscribe((selectionState) => {
        this.selectionState = selectionState
      })
  }

  ngOnInit(): void {}

  openAllMaterials(): void {
    if (this.selectionState.type !== 'all' || this.selectionState.currentFolder != null)
    {
      this.store.dispatch(new OpenAllMaterials())
    }
  }

  openFavourites(): void {
    if (this.selectionState.type !== 'favourites')
    {
      this.store.dispatch(new OpenFavourites())
    }
  }
}
