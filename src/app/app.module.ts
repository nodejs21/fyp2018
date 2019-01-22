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
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { SignupComponent } from './components/account/signup/signup.component';
import { ResetpasswordComponent } from './components/account/resetpassword/resetpassword.component';
import { AcademyadmindashboardComponent } from './components/users/academyadmin/academyadmindashboard/academyadmindashboard.component';
import { TeacherdashboardComponent } from './components/users/teacher/teacherdashboard/teacherdashboard.component';
import { StudentdashboardComponent } from './components/users/student/studentdashboard/studentdashboard.component';
import { AcademydetailsComponent } from './components/shared/academydetails/academydetails.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { SubjectdetailsComponent } from './components/shared/subjectdetails/subjectdetails.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentdetailsComponent } from './components/shared/studentdetails/studentdetails.component';
import { ClassroomsComponent } from './components/classrooms/classrooms.component';
import { ClassdetailsComponent } from './components/shared/classdetails/classdetails.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TeacherdetailsComponent } from './components/shared/teacherdetails/teacherdetails.component';
import { TeacherrequestsComponent } from './components/requests/teacherrequests/teacherrequests.component';
import { StudentrequestsComponent } from './components/requests/studentrequests/studentrequests.component';

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
    ChartsModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    // *********************** my components ***********************
    HomepageComponent,
    ProfileComponent,
    SignupComponent,
    ResetpasswordComponent,
    AcademyadmindashboardComponent,
    TeacherdashboardComponent,
    StudentdashboardComponent,
    AcademydetailsComponent,
    SubjectsComponent,
    SubjectdetailsComponent,
    StudentsComponent,
    StudentdetailsComponent,
    ClassroomsComponent,
    ClassdetailsComponent,
    TeachersComponent,
    TeacherdetailsComponent,
    TeacherrequestsComponent,
    StudentrequestsComponent,
    ClassroomsComponent,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
