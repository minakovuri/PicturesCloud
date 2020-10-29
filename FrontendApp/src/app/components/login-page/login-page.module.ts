import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import {LoginPageComponent} from './login-page.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    LoginPageComponent,
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
    LoginPageComponent,
  ]
})
export class LoginPageModule {}
