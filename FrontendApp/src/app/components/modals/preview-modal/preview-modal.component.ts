import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-preview-modal',
  template: `
    <img class="image-preview" src="{{imageUrl}}">
  `,
  styleUrls: ['./preview-modal.component.css']
})
export class PreviewModalComponent {
  @Input() imageUrl: string

  constructor(public activeModal: NgbActiveModal) {}
}
