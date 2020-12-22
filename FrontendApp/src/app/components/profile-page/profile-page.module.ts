import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';

import {ProfilePageComponent} from './profile-page.component';
import { ChangeLoginModalComponent } from './modals/change-login-modal/change-login-modal.component';
import { ChangePasswordModalComponent } from './modals/change-password-modal/change-password-modal.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    ChangeLoginModalComponent,
    ChangePasswordModalComponent,
  ],
  imports: [
    FormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    ProfilePageComponent,
  ]
})
export class ProfilePageModule {}
