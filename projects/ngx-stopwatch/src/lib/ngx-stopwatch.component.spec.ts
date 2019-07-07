import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxStopwatchComponent } from './ngx-stopwatch.component';

describe('NgxStopwatchComponent', () => {
  let component: NgxStopwatchComponent;
  let fixture: ComponentFixture<NgxStopwatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxStopwatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxStopwatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
