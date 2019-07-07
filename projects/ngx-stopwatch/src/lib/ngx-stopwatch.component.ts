import {Component, Input, OnInit} from '@angular/core';
import {TimeModel} from './time.model';
import {Subscription, timer} from 'rxjs';
import {NgxStopwatchService, StopwatchEvent} from './ngx-stopwatch.service';


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
  @Input()
  maxLaps: number = 10;
  @Input()
  cycleLaps: boolean = false;
  @Input()
  language: string = 'en';
  @Input()
  showControls: boolean = true;

  startButtonLabel: string;
  resetButtonLabel: string;
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

  constructor(protected stopwatchService: NgxStopwatchService) {
  }

  ngOnInit(): void {
    this.i18nInit();
    this.time = new TimeModel();
    this.initStopwatch();
    this.stopwatchService.getStopwatch().subscribe((stopwatchEvent: StopwatchEvent) => {
      if (stopwatchEvent.event === 'start') {
        this.startStopwatch();
      }

      if (stopwatchEvent.event === 'reset') {
        this.resetStopwatch();
      }
    });
  }

  private initStopwatch(): void {
    this.time = new TimeModel();
    this.start = new Date().getTime();
  }

  resetStopwatch(): void {
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
      if (this.lapEnabled && this.laps.length <= this.maxLaps) {
        if (this.laps.length === this.maxLaps) {
          this.laps = [];
        }
        this.laps.push(Object.assign({}, this.time));
      }
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

  private i18nInit(): void {

    switch (this.language) {
      case 'en':
        this.setEN();
        break;
      case 'es':
        this.setES();
        break;
      case 'pt':
        this.setPT();
        break;
      case 'cn':
        this.setCN();
        break;
      case 'hi':
        this.setHI();
        break;
      case 'ar':
        this.setAR();
        break;
      default:
        this.setEN();
        break;
    }
  }

  private setEN(): void {
    if (this.lapEnabled) {
      this.startButtonLabel = 'Start/Lap';
    } else {
      this.startButtonLabel = 'Start';
    }
    this.resetButtonLabel = 'Reset';
  }

  private setES(): void {
    if (this.lapEnabled) {
      this.startButtonLabel = 'Iniciar/Vuelta';
    } else {
      this.startButtonLabel = 'Iniciar';
    }
    this.resetButtonLabel = 'Resetear';
  }

  private setPT(): void {
    if (this.lapEnabled) {
      this.startButtonLabel = 'Começar/Colo';
    } else {
      this.startButtonLabel = 'Começar';
    }
    this.resetButtonLabel = 'Restabelecer';
  }

  private setCN(): void {
    if (this.lapEnabled) {
      this.startButtonLabel = '开始/膝部';
    } else {
      this.startButtonLabel = '开始';
    }
    this.resetButtonLabel = '重启';
  }

  private setHI(): void {
    if (this.lapEnabled) {
      this.startButtonLabel = 'शुरु/रीसेट';
    } else {
      this.startButtonLabel = 'शुरु';
    }
    this.resetButtonLabel = 'रीसेट';
  }

  private setAR(): void {
    if (this.lapEnabled) {
      this.startButtonLabel = 'حضن/بداية';
    } else {
      this.startButtonLabel = 'بداية';
    }
    this.resetButtonLabel = 'إعادة تعيين';
  }

}
