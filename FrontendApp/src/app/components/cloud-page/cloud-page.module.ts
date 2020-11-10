import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {CloudPageComponent} from './cloud-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { CommandPanelComponent } from './command-panel/command-panel.component';

@NgModule({
  declarations: [
    CloudPageComponent,
    SidebarComponent,
    ContentAreaComponent,
    CommandPanelComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    CloudPageComponent,
  ]
})
export class CloudPageModule {}
