import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AppState } from './stores/app.state';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
// import { ServicesModule } from '../services/services.module';
// import { EntryService } from '../services/entry.service';
// import { EntriesState } from './stores/entries.state';
// import { FilterState } from './stores/filter.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot([
      //   AppState,
      //   EntriesState,
      //   FilterState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
    // ServicesModule
  ],
  providers: [
    //   EntryService
  ],
  declarations: [],
  exports: [NgxsModule]
})
export class StateModule {}
