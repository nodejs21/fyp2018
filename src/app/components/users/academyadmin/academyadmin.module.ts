import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademyadmindashboardComponent } from './academyadmindashboard/academyadmindashboard.component';

@NgModule({
  declarations: [AcademyadmindashboardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AcademyadmindashboardComponent
  ]
})
export class AcademyadminModule { }
