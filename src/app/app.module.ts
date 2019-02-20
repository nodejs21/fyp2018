import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
// import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [DefaultLayoutComponent];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SignupComponent } from './components/account/signup/signup.component';
import { ResetpasswordComponent } from './components/account/resetpassword/resetpassword.component';
import { AuthService } from './utils/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  FirestoreSettingsToken,
  AngularFirestoreModule
} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './components/account/login/login.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AuthModule } from './utils/services/auth/auth.module';
import { ConfirmdeletionComponent } from './components/shared/confirmdeletion/confirmdeletion.component';
// import { LoginComponent } from './views/login/login.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    TooltipModule.forRoot(),
    ChartsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule.enablePersistence(),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    HomepageComponent,
    ResetpasswordComponent,
    LoginComponent,
    SignupComponent,
    ConfirmdeletionComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: FirestoreSettingsToken, useValue: {} },
    AngularFireAuth,
    AngularFirestore,
    AuthService,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
