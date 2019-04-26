import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AssignmentsComponent } from './course/assignments/assignments.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { AcademydetailComponent } from './details/academydetail/academydetail.component';
import { TeacherdetailComponent } from './details/teacherdetail/teacherdetail.component';
import { LecturesComponent } from './lectures/lectures.component';
import { StudentRoutingModule } from './student-routing.module';
import { AttemptquizComponent } from './attemptquiz/attemptquiz.component';
import { StudentComponent } from './student.component';
import { AttendanceComponent } from './course/attendance/attendance.component';
import { QuizzesComponent } from './course/quizzes/quizzes.component';
import { ResultComponent } from './course/result/result.component';
import { VideostreamComponent } from './liveclass/videostream/videostream.component';
import { WhiteboardComponent } from './liveclass/whiteboard/whiteboard.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { SearchacademyComponent } from '../../shared/searchacademy/searchacademy.component';
import { SearchacademyModule } from '../../shared/searchacademy/searchacademy.module';
import { RequestssentComponent } from './requests/requestssent/requestssent.component';
import { LiveclassComponent } from './liveclass/liveclass.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  declarations: [
    StudentComponent,
    StudentdashboardComponent,
    ProfileComponent,
    AssignmentsComponent,
    SubjectsComponent,
    AcademydetailComponent,
    TeacherdetailComponent,
    LecturesComponent,
    AttemptquizComponent,
    AttendanceComponent,
    AttendanceComponent,
    QuizzesComponent,
    ResultComponent,
    ProfileComponent,
    AttemptquizComponent,
    LecturesComponent,
    AcademydetailComponent,
    TeacherdetailComponent,
    VideostreamComponent,
    WhiteboardComponent,
    SubjectsComponent,
    RequestssentComponent,
    LiveclassComponent,
    ClassroomsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SearchacademyModule,
    StudentRoutingModule,
    RatingModule.forRoot(),
    ProgressbarModule.forRoot(),
    CollapseModule.forRoot(),
    ButtonsModule.forRoot(),
    FormsModule,
    AngularEditorModule,
    ReactiveFormsModule
  ],
  entryComponents: [SearchacademyComponent],
  exports: [StudentdashboardComponent],
  providers: [AngularFireDatabase]
})
export class StudentModule {}
