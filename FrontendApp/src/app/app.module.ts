import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginPageModule} from './components/login-page/login-page.module';
import { AuthenticationService } from './services/authentication.service';
import {reducers} from './store/state';
import {LogInEffects} from './store/effects/log-in.effects';
import {TokenProvider} from './services/token.service';
import {SignupPageModule} from './components/signup-page/signup-page.module';
import {SignUpEffects} from './store/effects/sign-up.effects';
import {CloudPageModule} from './components/cloud-page/cloud-page.module';
import {ContentManagementService} from './services/content-management.service';
import {ContentEffects} from './store/effects/content.effects';
import {CommandPanelEffects} from './store/effects/command-panel.effects';
import {ContentAreaEffects} from './store/effects/content-area.effects';
import {SelectionEffects} from './store/effects/selection.effects';
import {CreateFolderPopupEffects} from './store/effects/create-folder-popup.effects';
import {RenameContentPopupEffects} from './store/effects/rename-content-popup.effects';
import {ProfilePageModule} from './components/profile-page/profile-page.module';
import {ProfilePageEffects} from './store/effects/profile-page.effects';
import {SubscriptionsModule} from './components/common/subscriptions.module';

const effects = [
  LogInEffects,
  SignUpEffects,
  ContentEffects,
  CommandPanelEffects,
  ContentAreaEffects,
  SelectionEffects,
  CreateFolderPopupEffects,
  RenameContentPopupEffects,
  ProfilePageEffects,
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot(effects),
    NoopAnimationsModule,
    SubscriptionsModule,
    CloudPageModule,
    LoginPageModule,
    SignupPageModule,
    ProfilePageModule,
    NgbModule,
  ],
  providers: [
    AuthenticationService,
    ContentManagementService,
    TokenProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
