import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { AssignmentsComponent } from './course/assignments/assignments.component';
import { AttendanceComponent } from './course/attendance/attendance.component';
import { QuizzesComponent } from './course/quizzes/quizzes.component';
import { ResultComponent } from './course/result/result.component';
import { AttemptquizComponent } from './attemptquiz/attemptquiz.component';
import { LecturesComponent } from './lectures/lectures.component';
import { AcademydetailComponent } from './details/academydetail/academydetail.component';
import { TeacherdetailComponent } from './details/teacherdetail/teacherdetail.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { StudentComponent } from './student.component';
import { RequestssentComponent } from './requests/requestssent/requestssent.component';
import { LiveclassComponent } from './liveclass/liveclass.component';
import { ProfileComponent } from './profile/profile.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  // { path: 'profile', component: ProfileComponent },
  {
    path: '',
    component: StudentComponent,
    children: [
      { path: 'attemptquiz', component: AttemptquizComponent },
      { path: 'assignments', component: AssignmentsComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'quizzes', component: QuizzesComponent },
      { path: 'results', component: ResultComponent },

      {
        path: 'details',
        // redirectTo: 'assignments',
        // pathMatch: 'full',
        children: [
          { path: 'academy', component: AcademydetailComponent },
          { path: 'teacher', component: TeacherdetailComponent }
        ]
      },
      { path: 'lectures', component: LecturesComponent },
      {
        path: 'liveclass',
        component: LiveclassComponent
        // children: [
        //   { path: 'videostream', component: VideostreamComponent },
        //   { path: 'whiteboard', component: WhiteboardComponent }
        // ]
      },

      { path: 'classrooms', component: ClassroomsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'dashboard', component: StudentdashboardComponent },
      { path: 'subjects', component: SubjectsComponent },
      {
        path: 'requests',
        // redirectTo: 'invitations',
        // pathMatch: 'full',
        children: [{ path: 'sent', component: RequestssentComponent }]
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
