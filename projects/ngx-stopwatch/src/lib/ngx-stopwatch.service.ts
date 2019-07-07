import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

export interface StopwatchEvent {
  event: string;
}

@Injectable({
  providedIn: 'root'
})
export class NgxStopwatchService {

  constructor() {
  }

  public stopwatchObservable: Subject<StopwatchEvent> = new Subject<StopwatchEvent>();

  getStopwatch(): Observable<StopwatchEvent> {
    return this.stopwatchObservable.asObservable();
  }

  public start(): Promise<any> {
    return new Promise((resolve) => {
        this.stopwatchObservable.next({event: 'start'});
        resolve(true);
    });
  }

  public reset(): Promise<any> {
    return new Promise((resolve) => {
      this.stopwatchObservable.next({event: 'reset'});
      resolve(true);
    });
  }
}
