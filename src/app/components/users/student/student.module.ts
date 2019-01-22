import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { BootstrapModule } from 'src/app/bootstrap.module';

@NgModule({
  declarations: [StudentdashboardComponent],
  imports: [CommonModule, BootstrapModule],
  exports: [StudentdashboardComponent]
})
export class StudentModule {}
