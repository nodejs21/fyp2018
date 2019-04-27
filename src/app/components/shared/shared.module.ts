import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilepopupComponent } from './profilepopup/profilepopup.component';
import { AssignmentpopupComponent } from './assignmentpopup/assignmentpopup.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [ProfilepopupComponent, AssignmentpopupComponent],
  imports: [CommonModule, AngularEditorModule, FormsModule, MaterialModule],
  // entryComponents: [ProfileComponent],
  exports: [ProfilepopupComponent, AssignmentpopupComponent]
})
export class SharedModule {}
