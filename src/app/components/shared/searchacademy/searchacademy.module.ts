import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchacademyComponent } from './searchacademy.component';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchacademyComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [SearchacademyComponent]
})
export class SearchacademyModule {}
