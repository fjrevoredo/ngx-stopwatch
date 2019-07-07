import {Component, Input, OnInit} from '@angular/core';
import {TimeModel} from './time.model';
import {Subscription, timer} from 'rxjs';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-stopwatch',
  templateUrl: 'ngx-stopwatch.component.html',
  styleUrls: ['ngx-stopwatch.component.scss']
})
export class NgxStopwatchComponent implements OnInit {

  @Input()
  lapEnabled: boolean = true;
  @Input()
  showMillis: boolean = true;

  startButtonLabel: string = 'Start';
  laps: TimeModel[] = [];
  running: boolean = false;
  start: any;
  millisToHoursCotient: number = (1000 * 60 * 60);
  millisToMinutesCotient: number = (1000 * 60);
  millisToSecondsCotient: number = 1000;
  counter: number;
  time: TimeModel;
  increment: number = 50;
  timerObservable: Subscription;

  constructor() {
  }

  ngOnInit(): void {
    if (this.lapEnabled) {
      this.startButtonLabel = 'Start/Lap';
    }
    this.time = new TimeModel();
    this.initStopwatch();
  }

  private initStopwatch(): void {
    this.time = new TimeModel();
    this.start = new Date().getTime();
  }

  private resetStopwatch(): void {
    if (this.running) {
      this.running = !this.running;
      this.timerObservable.unsubscribe();
      this.initStopwatch();
    } else {
      this.initStopwatch();
    }

    if (this.lapEnabled && this.laps.length > 0) {
      this.laps = [];
    }
  }

  startStopwatch(): void {
    if (!this.running) {
      this.start = new Date().getTime();
      this.counter = 0;
      this.running = true;
      this.timerObservable = timer(0, this.increment).subscribe(() => {
        this.incrementStopwatch();
      });
    } else {
      this.laps.push(Object.assign({}, this.time));
    }
  }

  formatTime(time: number, digits: number): string {
    let fixedDigitNumber: string = time.toFixed(0);
    while (fixedDigitNumber.length < digits) {
      fixedDigitNumber = '0' + fixedDigitNumber;
    }
    return fixedDigitNumber;
  }

  incrementStopwatch(): void {
    let timeDifference: number = new Date().getTime() - this.start;
    // tslint:disable-next-line:no-bitwise
    const hours: number = ~~(timeDifference / this.millisToHoursCotient);
    if (hours >= 1) {
      timeDifference = timeDifference - (hours * this.millisToHoursCotient);
      this.time.hours = hours;
    }

    // tslint:disable-next-line:no-bitwise
    const minutes: number = ~~(timeDifference / this.millisToMinutesCotient);
    if (minutes >= 1) {
      timeDifference = timeDifference - (minutes * this.millisToMinutesCotient);
      this.time.minutes = minutes;
    }

    // tslint:disable-next-line:no-bitwise
    const seconds: number = ~~(timeDifference / this.millisToSecondsCotient);
    if (seconds >= 1) {
      timeDifference = timeDifference - (seconds * this.millisToSecondsCotient);
      this.time.seconds = seconds;
    }
    this.time.milliseconds = timeDifference;

  }

}
