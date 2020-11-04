import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CloudPageComponent } from './components/cloud-page/cloud-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import {LoginPageModule} from './components/login-page/login-page.module';
import { AuthenticationService } from './services/authentication.service';
import {reducers} from './store/state';
import {LogInEffects} from './store/effects/log-in.effects';
import {TokenProvider} from './services/token.service';
import {SignupPageModule} from './components/signup-page/signup-page.module';
import {SignUpEffects} from './store/effects/sign-up.effects';

const effects = [
  LogInEffects,
  SignUpEffects,
]

@NgModule({
  declarations: [
    AppComponent,
    CloudPageComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot(effects),
    LoginPageModule,
    SignupPageModule,
    NoopAnimationsModule,
  ],
  providers: [
    AuthenticationService,
    TokenProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
