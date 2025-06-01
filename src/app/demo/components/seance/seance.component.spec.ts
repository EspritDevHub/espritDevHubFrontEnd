import { ComponentFixture, TestBed } from '@angular/core/testing';

import { seanceComponent } from './seance.component';

describe('seanceComponent', () => {
  let component: seanceComponent;
  let fixture: ComponentFixture<seanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [seanceComponent]
    });
    fixture = TestBed.createComponent(seanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
