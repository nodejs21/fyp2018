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
    data: {
      title: 'Dashboard'
    },
    component: AcademyadminComponent,
    children: [
      {
        path: 'dashboard',
        component: AcademyadmindashboardComponent
      },
      {
        path: 'classrooms',
        component: ClassroomsComponent,
        data: {
          title: 'Classrooms'
        }
      },
      {
        path: 'details',
        // redirectTo: 'academy',
        // pathMatch: 'full',
        children: [
          {
            path: 'academy',
            component: AcademydetailComponent,
            data: {
              title: 'Academy Details'
            }
          },
          {
            path: 'classroom',
            component: ClassroomdetailComponent,
            data: {
              title: 'Calssroom Details'
            }
          },
          {
            path: 'student',
            component: StudentdetailComponent,
            data: {
              title: 'Student Details'
            }
          },
          {
            path: 'teacher',
            component: TeacherdetailComponent,
            data: {
              title: 'Teacher Details'
            }
          }
        ]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Profile'
        }
      },
      {
        path: 'requests',
        // redirectTo: 'student',
        children: [
          {
            path: 'student',
            component: StudentrequestsComponent,
            data: {
              title: 'Student Requests'
            }
          },
          {
            path: 'teacher',
            component: TeacherrequestsComponent,
            data: {
              title: 'Teacher Requests'
            }
          }
        ]
      },
      {
        path: 'results',
        // redirectTo: 'classroom',
        children: [
          {
            path: 'classroom',
            component: ClassroomresultComponent,
            data: {
              title: 'Classroom Result'
            }
          },
          {
            path: 'student',
            component: StudentresultComponent,
            data: {
              title: 'Student Result'
            }
          }
        ]
      },
      {
        path: 'students',
        component: StudentsComponent,
        data: {
          title: 'Students'
        }
      },
      {
        path: 'subjects',
        component: SubjectsComponent,
        data: {
          title: 'Subjects'
        }
      },
      {
        path: 'teachers',
        component: TeachersComponent,
        data: {
          title: 'Teachers'
        }
      }
    ]
  },

  { path: '**', redirectTo: 'profile', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademyadminRoutingModule {}
