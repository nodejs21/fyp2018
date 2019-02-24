import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { AssignmentsComponent } from './course/assignments/assignments.component';
import { AttendanceComponent } from './course/attendance/attendance.component';
import { QuizzesComponent } from './course/quizzes/quizzes.component';
import { ResultComponent } from './course/result/result.component';
import { AcademydetailComponent } from './details/academydetail/academydetail.component';
import { StudentdetailComponent } from './details/studentdetail/studentdetail.component';
import { LecturesComponent } from './lectures/lectures.component';
import { VideostreamComponent } from './liveclass/videostream/videostream.component';
import { WhiteboardComponent } from './liveclass/whiteboard/whiteboard.component';
import { ProfileComponent } from './profile/profile.component';
import { InvitationsComponent } from './requests/invitations/invitations.component';
import { RequestssentComponent } from './requests/requestssent/requestssent.component';
import { TeacherdashboardComponent } from './teacherdashboard/teacherdashboard.component';
import { MakequizComponent } from './makequiz/makequiz.component';
import { TeacherComponent } from './teacher.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: TeacherComponent,
    children: [
      { path: 'classrooms', component: ClassroomsComponent },
      {
        path: 'course',
        // redirectTo: 'assignments',
        // pathMatch: 'full',
        children: [
          { path: 'assignments', component: AssignmentsComponent },
          { path: 'attendance', component: AttendanceComponent },
          { path: 'quizzes', component: QuizzesComponent },
          { path: 'result', component: ResultComponent }
        ]
      },
      {
        path: 'details',
        // redirectTo: 'assignments',
        // pathMatch: 'full',
        children: [
          { path: 'academy', component: AcademydetailComponent },
          { path: 'student', component: StudentdetailComponent }
        ]
      },
      { path: 'lectures', component: LecturesComponent },
      {
        path: 'liveclass',
        // redirectTo: 'videostream',
        // pathMatch: 'full',
        children: [
          { path: 'videostream', component: VideostreamComponent },
          { path: 'whiteboard', component: WhiteboardComponent }
        ]
      },
      { path: 'makequiz', component: MakequizComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'requests',
        // redirectTo: 'invitations',
        // pathMatch: 'full',
        children: [
          { path: 'invitations', component: InvitationsComponent },
          { path: 'requestssent', component: RequestssentComponent }
        ]
      },
      { path: 'dashboard', component: TeacherdashboardComponent }
    ]
  },

  { path: '**', redirectTo: 'profile', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
