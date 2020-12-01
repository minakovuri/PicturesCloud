import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
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
import {ImagePreviewEffects} from './store/effects/image-preview.effects';

const effects = [
  LogInEffects,
  SignUpEffects,
  ContentEffects,
  CommandPanelEffects,
  ContentAreaEffects,
  SelectionEffects,
  ImagePreviewEffects,
]

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot(effects),
    NoopAnimationsModule,
    CloudPageModule,
    LoginPageModule,
    SignupPageModule,
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
