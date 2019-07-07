import { Component } from '@angular/core';
import {NgxStopwatchService} from '../../../ngx-stopwatch/src/lib/ngx-stopwatch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-stopwatch-showcase';

  constructor(protected stopwatchService: NgxStopwatchService) {

  }

  start() {
    this.stopwatchService.start();
  }

  reset() {
    this.stopwatchService.reset();
  }

  printTimePassed($event: any) {
    alert($event);
  }
}
