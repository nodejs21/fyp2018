import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AssignmentsComponent } from './course/assignments/assignments.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { AcademydetailComponent } from './details/academydetail/academydetail.component';
import { TeacherdetailComponent } from './details/teacherdetail/teacherdetail.component';
import { LecturesComponent } from './lectures/lectures.component';
import { StudentRoutingModule } from './student-routing.module';
import { AttendanceComponent } from './course/attendance/attendance.component';
import { QuizzesComponent } from './course/quizzes/quizzes.component';
import { ResultComponent } from './course/result/result.component';
import { AttemptquizComponent } from './attemptquiz/attemptquiz.component';
import { VideostreamComponent } from './liveclass/videostream/videostream.component';
import { WhiteboardComponent } from './liveclass/whiteboard/whiteboard.component';
import { StudentComponent } from './student.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    StudentdashboardComponent,
    ProfileComponent,
    AssignmentsComponent,
    SubjectsComponent,
    AcademydetailComponent,
    TeacherdetailComponent,
    LecturesComponent,
    AttendanceComponent,
    QuizzesComponent,
    ResultComponent,
    AttemptquizComponent,
    VideostreamComponent,
    WhiteboardComponent,
    StudentComponent
  ],
  imports: [CommonModule, StudentRoutingModule, CollapseModule.forRoot()],
  exports: [StudentdashboardComponent]
})
export class StudentModule {}
