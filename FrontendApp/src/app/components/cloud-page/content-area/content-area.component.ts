import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/state';
import {Content} from '../../../models/Content';
import {contentsStateSelector} from '../../../store/selectors/content.selectors';

@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  styleUrls: ['./content-area.component.css']
})
export class ContentAreaComponent implements OnInit {
  contentList: Array<Content>

  constructor(private store: Store<AppState>) {
    this.contentList = []

    this.store
      .pipe(select(contentsStateSelector))
      .subscribe((contentsState) =>
        this.contentList = contentsState.contents
      )
  }

  ngOnInit(): void {
  }

}
