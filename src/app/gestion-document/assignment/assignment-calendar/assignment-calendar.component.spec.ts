import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentCalendarComponent } from './assignment-calendar.component';

describe('AssignmentCalendarComponent', () => {
  let component: AssignmentCalendarComponent;
  let fixture: ComponentFixture<AssignmentCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentCalendarComponent]
    });
    fixture = TestBed.createComponent(AssignmentCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
