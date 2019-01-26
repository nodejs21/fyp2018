// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RatingModule } from 'ngx-bootstrap/rating';

import { CardsComponent } from './cards.component';

// Forms Component
import { FormsComponent } from './forms.component';

import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from './tabs.component';

// Carousel Component
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselsComponent } from './carousels.component';

// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CollapsesComponent } from './collapses.component';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoversComponent } from './popovers.component';

// Popover Component
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PaginationsComponent } from './paginations.component';

// Progress Component
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ProgressComponent } from './progress.component';

// Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TooltipsComponent } from './tooltips.component';


// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { AssignmentsComponent } from './assignments/assignments.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { CreatequizComponent } from './createquiz/createquiz.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import { TeacherdetailsComponent } from './teacherdetails/teacherdetails.component';
import { SubjectdetailsComponent } from './subjectdetails/subjectdetails.component';
import { ClassroomdetailsComponent } from './classroomdetails/classroomdetails.component';
import { AcademydetailsComponent } from './academydetails/academydetails.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { AcademycardComponent } from './shared/cards/academycard/academycard.component';
import { ClassroomcardComponent } from './shared/cards/classroomcard/classroomcard.component';
import { StudentcardComponent } from './shared/cards/studentcard/studentcard.component';
import { SubjectcardComponent } from './shared/cards/subjectcard/subjectcard.component';
import { TeachercardComponent } from './shared/cards/teachercard/teachercard.component';
import { ClasscardComponent } from '../../view/base/shared/cards/classcard/classcard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RatingModule.forRoot(),
  ],
  declarations: [
    CardsComponent,
    FormsComponent,
    SwitchesComponent,
    TablesComponent,
    TabsComponent,
    CarouselsComponent,
    CollapsesComponent,
    PaginationsComponent,
    PopoversComponent,
    ProgressComponent,
    TooltipsComponent,
    AssignmentsComponent,
    QuizzesComponent,
    CreatequizComponent,
    StudentdetailsComponent,
    TeacherdetailsComponent,
    SubjectdetailsComponent,
    ClassroomdetailsComponent,
    AcademydetailsComponent,
    ClassroomsComponent,
    AcademycardComponent,
    ClassroomcardComponent,
    StudentcardComponent,
    SubjectcardComponent,
    TeachercardComponent,
    ClasscardComponent,
  ]
})
export class BaseModule { }
