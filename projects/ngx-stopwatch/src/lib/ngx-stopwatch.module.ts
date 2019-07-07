import { NgModule } from '@angular/core';
import { NgxStopwatchComponent } from './ngx-stopwatch.component';
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [NgxStopwatchComponent],
  imports: [ CommonModule
  ],
  exports: [NgxStopwatchComponent]
})
export class NgxStopwatchModule { }
