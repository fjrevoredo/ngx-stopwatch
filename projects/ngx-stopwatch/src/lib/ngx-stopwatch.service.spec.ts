import { TestBed } from '@angular/core/testing';

import { NgxStopwatchService } from './ngx-stopwatch.service';

describe('NgxStopwatchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxStopwatchService = TestBed.get(NgxStopwatchService);
    expect(service).toBeTruthy();
  });
});
