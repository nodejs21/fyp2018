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
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { SearchacademyComponent } from '../../shared/searchacademy/searchacademy.component';
import { SearchacademyModule } from '../../shared/searchacademy/searchacademy.module';
import { RequestssentComponent } from './requests/requestssent/requestssent.component';

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
    RequestssentComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    SearchacademyModule,
    StudentRoutingModule,
    RatingModule.forRoot(),
    ProgressbarModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule
  ],
  entryComponents: [SearchacademyComponent],
  exports: [StudentdashboardComponent]
})
export class StudentModule {}
