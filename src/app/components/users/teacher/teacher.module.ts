import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherdashboardComponent } from './teacherdashboard/teacherdashboard.component';

@NgModule({
  declarations: [TeacherdashboardComponent],
  imports: [CommonModule],
  exports: [TeacherdashboardComponent]
})
export class TeacherModule {}
