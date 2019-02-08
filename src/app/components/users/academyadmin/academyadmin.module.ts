import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademyadmindashboardComponent } from './academyadmindashboard/academyadmindashboard.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentrequestsComponent } from './requests/studentrequests/studentrequests.component';
import { TeacherrequestsComponent } from './requests/teacherrequests/teacherrequests.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentdetailComponent } from './details/studentdetail/studentdetail.component';
import { ClassroomdetailComponent } from './details/classroomdetail/classroomdetail.component';
import { StudentresultComponent } from './results/studentresult/studentresult.component';
import { ClassroomresultComponent } from './results/classroomresult/classroomresult.component';
import { InviteteacherComponent } from './inviteteacher/inviteteacher.component';
import { AcademydetailComponent } from './details/academydetail/academydetail.component';
import { TeacherdetailComponent } from './details/teacherdetail/teacherdetail.component';

@NgModule({
  declarations: [
    AcademyadmindashboardComponent,
    StudentsComponent,
    TeachersComponent,
    StudentrequestsComponent,
    TeacherrequestsComponent,
    SubjectsComponent,
    ClassroomsComponent,
    ProfileComponent,
    StudentdetailComponent,
    TeacherdetailComponent,
    ClassroomdetailComponent,
    StudentresultComponent,
    ClassroomresultComponent,
    InviteteacherComponent,
    AcademydetailComponent,
    TeacherdetailComponent
  ],
  imports: [CommonModule],
  exports: [AcademyadmindashboardComponent]
})
export class AcademyadminModule {}
