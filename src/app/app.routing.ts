import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { SignupComponent } from './components/account/signup/signup.component';
import { LoginComponent } from './components/account/login/login.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
    component: SignupComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    // data: {
    //   title: 'Home'
    // },
    children: [
      {
        path: 'academyadmin',
        loadChildren:
          './components/users/academyadmin/academyadmin.module#AcademyadminModule'
      },
      {
        path: 'teacher',
        loadChildren: './components/users/teacher/teacher.module#TeacherModule'
      },
      {
        path: 'student',
        loadChildren: './components/users/student/student.module#StudentModule'
      },
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
  }
  // *******************my components routing*******************
  // {
  //   path: 'my',
  //   children: [
  //     { path: '', component: HomepageComponent },
  //     {
  //       path: 'account',
  //       children: [
  //         { path: '', redirectTo: 'profile', pathMatch: 'full' },
  //         { path: 'profile', component: ProfileComponent },
  //         { path: 'login', component: LoginComponent },
  //         { path: 'signup', component: SignupComponent },
  //         { path: 'reset-password', component: ResetpasswordComponent },
  //         { path: '**', redirectTo: 'profile', pathMatch: 'full' }
  //       ]
  //     },
  //     {
  //       path: 'dashboard',
  //       children: [
  //         { path: '', redirectTo: '/', pathMatch: 'full' },
  //         {
  //           path: 'academyadmin/:academyname',
  //           component: AcademyadmindashboardComponent
  //         },
  //         {
  //           path: 'teacher/:academyname/:teachername',
  //           component: TeacherdashboardComponent
  //         },
  //         {
  //           path: 'student/:academyname/:studentname',
  //           component: StudentdashboardComponent
  //         },
  //         { path: '**', redirectTo: '/', pathMatch: 'full' }
  //       ]
  //     },
  //     {
  //       path: 'academy/:academyname',
  //       component: AcademydetailsComponent,
  //       children: [
  //         {
  //           path: 'subjects',
  //           component: SubjectsComponent,
  //           children: [
  //             { path: ':subjectname', component: SubjectdetailsComponent }
  //           ]
  //         },
  //         {
  //           path: 'students',
  //           component: StudentsComponent,
  //           children: [
  //             { path: ':studentname', component: StudentdetailsComponent }
  //           ]
  //         },
  //         {
  //           path: 'classrooms',
  //           component: ClassroomsComponent,
  //           children: [{ path: ':calssname', component: ClassdetailsComponent }]
  //         },
  //         {
  //           path: 'teachers',
  //           component: TeachersComponent,
  //           children: [
  //             { path: ':teacher:name', component: TeacherdetailsComponent }
  //           ]
  //         },
  //         {
  //           path: 'requests',
  //           children: [
  //             { path: 'teachers', component: TeacherrequestsComponent },
  //             { path: 'students', component: StudentrequestsComponent }
  //           ]
  //         }
  //       ]
  //     },
  //     { path: ':academyname/classrooms', component: ClassroomsComponent }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
