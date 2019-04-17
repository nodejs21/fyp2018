import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AcademyadmindashboardComponent } from "./academyadmindashboard/academyadmindashboard.component";
import { StudentsComponent } from "./students/students.component";
import { TeachersComponent } from "./teachers/teachers.component";
import { StudentrequestsComponent } from "./requests/studentrequests/studentrequests.component";
import { TeacherrequestsComponent } from "./requests/teacherrequests/teacherrequests.component";
import { SubjectsComponent } from "./subjects/subjects.component";
import { ClassroomsComponent } from "./classrooms/classrooms.component";
import { ProfileComponent } from "./profile/profile.component";
import { StudentdetailComponent } from "./details/studentdetail/studentdetail.component";
import { ClassroomdetailComponent } from "./details/classroomdetail/classroomdetail.component";
import { StudentresultComponent } from "./results/studentresult/studentresult.component";
import { ClassroomresultComponent } from "./results/classroomresult/classroomresult.component";
import { InviteteacherComponent } from "./inviteteacher/inviteteacher.component";
import { AcademydetailComponent } from "./details/academydetail/academydetail.component";
import { TeacherdetailComponent } from "./details/teacherdetail/teacherdetail.component";
import { AcademyadminRoutingModule } from "./academyadmin-routing.module";
import { AcademyadminComponent } from "./academyadmin.component";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../../material.module";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { RatingModule } from "ngx-bootstrap/rating";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { AddclassComponent } from "./academyadmindashboard/addclass/addclass.component";
import { AddsubjectComponent } from "./subjects/addsubject/addsubject.component";
import { ConfirmdeletionComponent } from "../../shared/confirmdeletion/confirmdeletion.component";
import { ConfirmdeletionModule } from "../../shared/confirmdeletion/confirmdeletion.module";
import { CreateclassroomComponent } from "./classrooms/createclassroom/createclassroom.component";

@NgModule({
  declarations: [
    AddclassComponent,
    AcademyadminComponent,
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
    TeacherdetailComponent,
    AddclassComponent,
    AddsubjectComponent,
    CreateclassroomComponent
  ],
  imports: [
    CommonModule,
    AcademyadminRoutingModule,
    TooltipModule.forRoot(),
    RatingModule.forRoot(),
    ProgressbarModule.forRoot(),
    FormsModule,
    MaterialModule,
    ConfirmdeletionModule,
    ReactiveFormsModule
  ],
  exports: [AcademyadmindashboardComponent],
  entryComponents: [
    AddclassComponent,
    AddsubjectComponent,
    ConfirmdeletionComponent,
    CreateclassroomComponent
  ],
  providers: [FormBuilder]
})
export class AcademyadminModule {}
