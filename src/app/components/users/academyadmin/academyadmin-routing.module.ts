import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcademyadmindashboardComponent } from './academyadmindashboard/academyadmindashboard.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { AcademydetailComponent } from './details/academydetail/academydetail.component';
import { ClassroomdetailComponent } from './details/classroomdetail/classroomdetail.component';
import { StudentdetailComponent } from './details/studentdetail/studentdetail.component';
import { TeacherdetailComponent } from './details/teacherdetail/teacherdetail.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentrequestsComponent } from './requests/studentrequests/studentrequests.component';
import { TeacherrequestsComponent } from './requests/teacherrequests/teacherrequests.component';
import { ClassroomresultComponent } from './results/classroomresult/classroomresult.component';
import { StudentresultComponent } from './results/studentresult/studentresult.component';
import { StudentsComponent } from './students/students.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TeachersComponent } from './teachers/teachers.component';
import { AcademyadminComponent } from './academyadmin.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: AcademyadminComponent,
    children: [
      { path: 'dashboard', component: AcademyadmindashboardComponent },
      { path: 'classrooms', component: ClassroomsComponent },
      {
        path: 'detail',
        // redirectTo: 'academy',
        // pathMatch: 'full',
        children: [
          { path: 'academy', component: AcademydetailComponent },
          { path: 'classroom', component: ClassroomdetailComponent },
          { path: 'student', component: StudentdetailComponent },
          { path: 'teacher', component: TeacherdetailComponent }
        ]
      },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'requests',
        // redirectTo: 'student',
        children: [
          { path: 'student', component: StudentrequestsComponent },
          { path: 'teacher', component: TeacherrequestsComponent }
        ]
      },
      {
        path: 'results',
        // redirectTo: 'classroom',
        children: [
          { path: 'classroom', component: ClassroomresultComponent },
          { path: 'student', component: StudentresultComponent }
        ]
      },
      { path: 'students', component: StudentsComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'teachers', component: TeachersComponent }
    ]
  },

  { path: '**', redirectTo: 'profile', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademyadminRoutingModule {}
