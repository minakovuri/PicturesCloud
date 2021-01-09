import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  template: ''
})
export class SubscriptionsComponent implements OnDestroy, OnInit {
  protected subscriptions: Subscription[]

  constructor() {
    this.subscriptions = []
  }

  protected onInit(): void {}
  protected onDestroy(): void {}

  ngOnInit(): void {
    this.onInit()
  }

  ngOnDestroy(): void {
    this.onDestroy()
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
