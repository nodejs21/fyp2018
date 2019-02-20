import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmdeletionComponent } from './confirmdeletion.component';
import { MaterialModule } from '../../../material.module';

@NgModule({
  declarations: [ConfirmdeletionComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ConfirmdeletionComponent]
})
export class ConfirmdeletionModule {}
