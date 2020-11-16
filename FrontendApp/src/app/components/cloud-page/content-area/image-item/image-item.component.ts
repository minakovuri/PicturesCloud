import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.css']
})
export class ImageItemComponent implements OnInit {
  @Input() Id: number
  @Input() Guid: string
  @Input() Name: string
  @Input() FolderId: number|null

  constructor() { }

  ngOnInit(): void {
  }
}
