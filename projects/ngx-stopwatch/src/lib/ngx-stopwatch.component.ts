import {Component, OnInit} from '@angular/core';
import {TimeModel} from "./time.model";
import {Observable, Subscription, timer} from "rxjs";

@Component({
  selector: 'ngx-stopwatch',
  template: `
    <p>
      {{formatTime(time.hours, 2)}} : {{formatTime(time.minutes, 2)}} : {{formatTime(time.seconds, 2)}} : <span
      *ngIf="showMillis"
      class="millis">{{formatTime(time.milliseconds, 3)}}</span>
    </p>
    <p>
      <button (click)="startStopwatch()">Start</button>
      <button (click)="resetStopwatch()">Reset</button>
    </p>

  `,
  styles: []
})
export class NgxStopwatchComponent implements OnInit {

  running = false;
  showMillis = true;
  start: any;
  millisToHoursCotient = (1000 * 60 * 60);
  millisToMinutesCotient = (1000 * 60);
  millisToSecondsCotient = 1000;
  counter: number;
  time: TimeModel;
  increment = 50;
  timerObservable: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.time = new TimeModel();
    this.initStopwatch();
  }

  private initStopwatch() {
    this.time = new TimeModel();
    this.start = new Date().getTime();
  }

  private resetStopwatch() {
    if (this.running) {
      this.running = !this.running;
      this.timerObservable.unsubscribe();
      this.initStopwatch();
    } else {
      this.initStopwatch();
    }
  }

  startStopwatch() {
    if (!this.running) {
      this.start = new Date().getTime();
      this.counter = 0;
      this.running = true;
      this.timerObservable = timer(0, this.increment).subscribe(ellapsedCycles => {
        this.incrementStopwatch();
      });
    } else {
      this.stopStopwatch();
    }
  }

  stopStopwatch() {
    if (this.running) {
      this.running = !this.running;
      this.timerObservable.unsubscribe();
    }
  }

  formatTime(time: number, digits: number) {
    let fixedDigitNumber = time.toFixed(0);
    while (fixedDigitNumber.length < digits) {
      fixedDigitNumber = '0' + fixedDigitNumber;
    }
    return fixedDigitNumber;
  }

  incrementStopwatch() {
    let timeDifference = new Date().getTime() - this.start;
    let hours = ~~(timeDifference / this.millisToHoursCotient);
    if (hours >= 1) {
      timeDifference = timeDifference - (hours * this.millisToHoursCotient);
      this.time.hours = hours;
    }

    let minutes = ~~(timeDifference / this.millisToMinutesCotient);
    if (minutes >= 1) {
      timeDifference = timeDifference - (minutes * this.millisToMinutesCotient);
      this.time.minutes = minutes;
    }

    let seconds = ~~(timeDifference / this.millisToSecondsCotient);
    if (seconds >= 1) {
      timeDifference = timeDifference - (seconds * this.millisToSecondsCotient);
      this.time.seconds = seconds;
    }
    this.time.milliseconds = timeDifference;

  }

}
