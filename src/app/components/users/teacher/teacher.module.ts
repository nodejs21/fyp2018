import { NgModule } from "@angular/core";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CommonModule } from "@angular/common";
import { ClassroomsComponent } from "./classrooms/classrooms.component";
import { AssignmentsComponent } from "./course/assignments/assignments.component";
import { AttendanceComponent } from "./course/attendance/attendance.component";
import { QuizzesComponent } from "./course/quizzes/quizzes.component";
import { ResultComponent } from "./course/result/result.component";
import { AcademydetailComponent } from "./details/academydetail/academydetail.component";
import { StudentdetailComponent } from "./details/studentdetail/studentdetail.component";
import { LecturesComponent } from "./lectures/lectures.component";
import { VideostreamComponent } from "./liveclass/videostream/videostream.component";
import { WhiteboardComponent } from "./liveclass/whiteboard/whiteboard.component";
import { ProfileComponent } from "./profile/profile.component";
import { InvitationsComponent } from "./requests/invitations/invitations.component";
import { RequestssentComponent } from "./requests/requestssent/requestssent.component";
import { TeacherdashboardComponent } from "./teacherdashboard/teacherdashboard.component";
import { MakequizComponent } from "./makequiz/makequiz.component";
import { TeacherComponent } from "./teacher.component";
import { TeacherRoutingModule } from "./teacher-routing.module";
import { RatingModule } from "ngx-bootstrap/rating";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { SearchacademyComponent } from "../../shared/searchacademy/searchacademy.component";
import { SearchacademyModule } from "../../shared/searchacademy/searchacademy.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../../material.module";
import { AddassignmentComponent } from "./course/assignments/addassignment/addassignment.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { CreateassignmentComponent } from "./createassignment/createassignment.component";
import { HttpClientModule } from "@angular/common/http";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { SharedModule } from "../../shared/shared.module";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { LiveclassComponent } from "./liveclass/liveclass.component";
import { AngularFireDatabase } from "@angular/fire/database";
import { ProfilepopupComponent } from "../../shared/profilepopup/profilepopup.component";

@NgModule({
  declarations: [
    AssignmentsComponent,
    TeacherComponent,
    TeacherdashboardComponent,
    LecturesComponent,
    ClassroomsComponent,
    StudentdetailComponent,
    AcademydetailComponent,
    InvitationsComponent,
    ProfileComponent,
    ClassroomsComponent,
    AssignmentsComponent,
    AttendanceComponent,
    QuizzesComponent,
    ResultComponent,
    AcademydetailComponent,
    StudentdetailComponent,
    LecturesComponent,
    VideostreamComponent,
    WhiteboardComponent,
    ProfileComponent,
    InvitationsComponent,
    RequestssentComponent,
    MakequizComponent,
    AddassignmentComponent,
    CreateassignmentComponent,
    LiveclassComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    RatingModule.forRoot(),
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    ButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SearchacademyModule,
    MaterialModule,
    HttpClientModule,
    AngularEditorModule,
    SharedModule
  ],
  entryComponents: [
    SearchacademyComponent,
    AddassignmentComponent
  ],
  exports: [TeacherdashboardComponent],

  providers: [AngularFireDatabase]
})
export class TeacherModule {}
