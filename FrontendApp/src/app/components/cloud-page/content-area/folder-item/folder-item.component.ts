import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-folder-item',
  templateUrl: './folder-item.component.html',
  styleUrls: ['./folder-item.component.css']
})
export class FolderItemComponent implements OnInit {
  @Input() Id: number
  @Input() Guid: string
  @Input() Name: string
  @Input() FolderId: number|null

  constructor() { }

  ngOnInit(): void {
  }

}
