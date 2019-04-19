import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilepopupComponent } from './profilepopup/profilepopup.component';

@NgModule({
  declarations: [ProfilepopupComponent],
  imports: [CommonModule],
  // entryComponents: [ProfileComponent],
  exports: [ProfilepopupComponent]
})
export class SharedModule {}
