import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state';
import {AddImage} from '../../../store/actions/view-model/command-panel.actions';

@Component({
  selector: 'app-command-panel',
  templateUrl: './command-panel.component.html',
  styleUrls: ['./command-panel.component.css']
})
export class CommandPanelComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  onFileInput(event): void {
    const file = event.target.files[0]

    this.store.dispatch(new AddImage({
      file,
      folderId: null, // TODO: надо добавить selection
    }))
  }

}
