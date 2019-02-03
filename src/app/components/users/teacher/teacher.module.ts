import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherdashboardComponent } from './teacherdashboard/teacherdashboard.component';
import { LecturesComponent } from './lectures/lectures.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { StudentdetailComponent } from './details/studentdetail/studentdetail.component';
import { AcademydetailComponent } from './details/academydetail/academydetail.component';
import { InvitationsComponent } from './requests/invitations/invitations.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    TeacherdashboardComponent,
    LecturesComponent,
    ClassroomsComponent,
    StudentdetailComponent,
    AcademydetailComponent,
    InvitationsComponent,
    ProfileComponent
  ],
  imports: [CommonModule],
  exports: [TeacherdashboardComponent]
})
export class TeacherModule {}
