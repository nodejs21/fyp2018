import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AssignmentsComponent } from './course/assignments/assignments.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { AcademydetailComponent } from './details/academydetail/academydetail.component';
import { TeacherdetailComponent } from './details/teacherdetail/teacherdetail.component';
import { LecturesComponent } from './lectures/lectures.component';

@NgModule({
  declarations: [StudentdashboardComponent, ProfileComponent, AssignmentsComponent, SubjectsComponent, AcademydetailComponent, TeacherdetailComponent, LecturesComponent],
  imports: [CommonModule],
  exports: [StudentdashboardComponent]
})
export class StudentModule {}
