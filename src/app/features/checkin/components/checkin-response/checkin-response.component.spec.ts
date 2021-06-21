import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinResponseComponent } from './checkin-response.component';

describe('CheckinResponseComponent', () => {
  let component: CheckinResponseComponent;
  let fixture: ComponentFixture<CheckinResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
