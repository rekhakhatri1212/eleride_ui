import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideNavigationBarComponent } from './side-navigation-bar/side-navigation-bar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MaterialModule } from './material.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { StoreModule } from '@ngrx/store';
import { SignUpReducer } from './store/sign-up/sign-up.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { SignUpEffects } from './store/sign-up/sign-up.effects';
import { HttpClientModule } from '@angular/common/http';
import { VerifyPhoneNumberComponent } from './verify-phone-number/verify-phone-number.component';
import { reducers } from './models/app-state.model';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavigationBarComponent,
    SignUpComponent,
    SignInComponent,
    VerifyPhoneNumberComponent
  ],
  imports: [
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([
      SignUpEffects
    ]),
    StoreModule.forRoot(reducers),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SocialLoginModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1028958814213-fs6e3gs88k4kmu4tb5ksqeh7gubnav5r.apps.googleusercontent.com'),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('269127302063153'),
          }
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
