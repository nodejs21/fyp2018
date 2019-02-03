import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestssentComponent } from './requestssent/requestssent.component';
import { RequestsComponent } from './requests.component';

@NgModule({
  declarations: [RequestssentComponent, RequestsComponent],
  imports: [
    CommonModule,
    RequestsRoutingModule
  ]
})
export class RequestsModule { }
