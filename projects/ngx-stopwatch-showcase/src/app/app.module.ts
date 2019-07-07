import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxStopwatchModule} from '../../../ngx-stopwatch/src/lib/ngx-stopwatch.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxStopwatchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
