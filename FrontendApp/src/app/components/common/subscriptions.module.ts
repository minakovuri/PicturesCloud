import {NgModule} from '@angular/core';
import {SubscriptionsComponent} from './subscriptions.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    SubscriptionsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SubscriptionsComponent,
  ]
})
export class SubscriptionsModule {}
