import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';

import {BreadcrumbsItem} from '../../../../store/reducers/breadcrumbs.reducer';
import {AppState} from '../../../../store/state';
import {breadcrumbsStateSelector} from '../../../../store/selectors/breadcrumbs.selectors';
import {OpenAllMaterials, OpenFavourites, OpenFolder} from '../../../../store/actions/view-model/selection.actions';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  items: BreadcrumbsItem[]

  constructor(
    private store: Store<AppState>
  ) {
    this.items = []

    this.store
      .pipe(select(breadcrumbsStateSelector))
      .subscribe((breadcrumbsState) => {
        this.items = breadcrumbsState.items
      })
  }

  ngOnInit(): void {
  }

  onItemClick(item: BreadcrumbsItem): void {
    if (this.items.indexOf(item) === this.items.length - 1)
    {
      return
    }

    switch (item.type) {
      case 'all':
        this.store.dispatch(new OpenAllMaterials())
        break
      case 'favourites':
        this.store.dispatch(new OpenFavourites())
        break
      case 'folder':
        this.store.dispatch(new OpenFolder({
          folderID: item.id,
          folderName: item.name,
        }))
        break
    }
  }
}
