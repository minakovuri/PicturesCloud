import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state';
import {OpenAllMaterials} from '../../store/actions/selection.actions';

@Component({
  selector: 'app-cloud-page',
  templateUrl: './cloud-page.component.html',
  styleUrls: ['./cloud-page.component.css']
})
export class CloudPageComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new OpenAllMaterials())
  }
}
