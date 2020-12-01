import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {CloudPageComponent} from './cloud-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { CommandPanelComponent } from './command-panel/command-panel.component';
import { ImageItemComponent } from './content-area/image-item/image-item.component';
import { FolderItemComponent } from './content-area/folder-item/folder-item.component';
import { PreviewModalComponent } from './content-area/preview-modal.component';

@NgModule({
  declarations: [
    CloudPageComponent,
    SidebarComponent,
    ContentAreaComponent,
    CommandPanelComponent,
    ImageItemComponent,
    FolderItemComponent,
    PreviewModalComponent,
  ],
    imports: [
        CommonModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        NgbModule,
    ],
  exports: [
    CloudPageComponent,
  ]
})
export class CloudPageModule {}
