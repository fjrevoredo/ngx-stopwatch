import {Component, OnInit} from '@angular/core';
import {TimeModel} from "./time.model";

@Component({
  selector: 'ngx-stopwatch',
  template: `
    <p>
      {{formatTime(time.hours, 2)}} : {{formatTime(time.minutes, 2)}} : {{formatTime(time.seconds, 2)}} : <span *ngIf="showMillis"
                                                                                                 class="millis">{{formatTime(time.milliseconds, 3)}}</span>
    </p>
    <p>
      <button (click)="startStopwatch()">Start</button>
      <button (click)="stopStopwatch()">Stop</button>
      <button (click)="resetStopwatch()">Reset</button>
    </p>

  `,
  styles: []
})
export class NgxStopwatchComponent implements OnInit {

  timerRef: any;
  running = false;
  showMillis = true;
  start: any;
  millisToHoursCotient = (1000 * 60 * 60);
  millisToMinutesCotient = (1000 * 60);
  millisToSecondsCotient = 1000;
  tickerMin = 300;
  tickerMax = 320;
  counter: number;
  time: TimeModel;
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

  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.timerRef = setInterval(() => {
        this.incrementStopwatch();
      });
    } else {
      clearInterval(this.timerRef);
    }
  }

  private resetStopwatch() {
    if (this.running) {
      this.running = !this.running;
      clearInterval(this.timerRef);
      this.initStopwatch();
    } else {
      this.initStopwatch();
    }
  }

  startStopwatch() {
    if (!this.running) {
      this.counter = 0;
      this.running = true;
      this.timerRef = setInterval(() => {
        this.incrementStopwatch();
      }, 10);
    }
  }

  stopStopwatch() {
    if (this.running) {
      this.running = !this.running;
      clearInterval(this.timerRef);
    }
  }

  formatTime(time: number, digits: number) {
    return time.toLocaleString('es-AR', {
      minimumIntegerDigits: digits,
      useGrouping: false,
      maximumFractionDigits: 0
    });
  }

  private incrementStopwatch() {
    this.counter++;

    let timeDifference = new Date().getTime() - this.start;

    // if(this.counter > this.tickerMin && this.counter < this.tickerMax) {
    //   console.log(timeDifference);
    // }

    let hours = ~~(timeDifference / this.millisToHoursCotient);
    if (hours >= 1) {
      timeDifference = timeDifference - (hours * this.millisToHoursCotient);
      this.time.hours = hours;
    }

    let minutes =  ~~(timeDifference / this.millisToMinutesCotient);
    if (minutes >= 1) {
      timeDifference = timeDifference - (minutes * this.millisToMinutesCotient);
      this.time.minutes = minutes;
    }

    let seconds =  ~~(timeDifference / this.millisToSecondsCotient);
    if (seconds >= 1) {
      timeDifference = timeDifference - (seconds * this.millisToSecondsCotient);
      this.time.seconds = seconds;
    }
    this.time.milliseconds = timeDifference;

    if(timeDifference >= 999){
      console.log(timeDifference);
      console.log(JSON.stringify(this.time));
    }

    // if(this.counter > this.tickerMin && this.counter < this.tickerMax) {
    //   console.log(JSON.stringify(this.time));
    // }

  }

}
