import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
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
import { ProfileComponent } from './components/shared/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren:
          './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      }
    ]
  },
  // *******************my components routing*******************
  {
    path: 'my',
    children: [
      {path: '', component: HomepageComponent},
      {
        path: 'account',
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: 'profile', component: ProfileComponent },
          { path: 'login', component: LoginComponent },
          { path: 'signup', component: SignupComponent },
          { path: 'reset-password', component: ResetpasswordComponent },
          { path: '**', redirectTo: 'profile', pathMatch: 'full' }
        ]
      },
      {
        path: 'dashboard',
        children: [
          { path: '', redirectTo: '/', pathMatch: 'full' },
          {
            path: 'academyadmin/:academyname',
            component: AcademyadmindashboardComponent
          },
          {
            path: 'teacher/:academyname/:teachername',
            component: TeacherdashboardComponent
          },
          {
            path: 'student/:academyname/:studentname',
            component: StudentdashboardComponent
          },
          { path: '**', redirectTo: '/', pathMatch: 'full' }
        ]
      },
      {
        path: 'academy/:academyname',
        component: AcademydetailsComponent,
        children: [
          {
            path: 'subjects',
            component: SubjectsComponent,
            children: [
              { path: ':subjectname', component: SubjectdetailsComponent }
            ]
          },
          {
            path: 'students',
            component: StudentsComponent,
            children: [
              { path: ':studentname', component: StudentdetailsComponent }
            ]
          },
          {
            path: 'classrooms',
            component: ClassroomsComponent,
            children: [{ path: ':calssname', component: ClassdetailsComponent }]
          },
          {
            path: 'teachers',
            component: TeachersComponent,
            children: [
              { path: ':teacher:name', component: TeacherdetailsComponent }
            ]
          },
          {
            path: 'requests',
            children: [
              { path: 'teachers', component: TeacherrequestsComponent },
              { path: 'students', component: StudentrequestsComponent }
            ]
          }
        ]
      },
      { path: ':academyname/classrooms', component: ClassroomsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
