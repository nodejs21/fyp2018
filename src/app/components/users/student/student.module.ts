import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';

@NgModule({
  declarations: [StudentdashboardComponent],
  imports: [CommonModule],
  exports: [StudentdashboardComponent]
})
export class StudentModule {}
