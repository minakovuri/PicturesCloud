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
import { PreviewModalComponent } from './content-area/modals/preview-modal/preview-modal.component';
import {CreateFolderModalComponent} from './content-area/modals/create-folder-modal/create-folder-modal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import { RenameContentModalComponent } from './content-area/modals/rename-content-modal/rename-content-modal.component';
import { BreadcrumbsComponent } from './command-panel/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    CloudPageComponent,
    SidebarComponent,
    ContentAreaComponent,
    CommandPanelComponent,
    ImageItemComponent,
    FolderItemComponent,
    PreviewModalComponent,
    CreateFolderModalComponent,
    RenameContentModalComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [
    CloudPageComponent,
  ]
})
export class CloudPageModule {}
