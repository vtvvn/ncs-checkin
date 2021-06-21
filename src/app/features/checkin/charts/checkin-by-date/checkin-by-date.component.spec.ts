import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinByDateComponent } from './checkin-by-date.component';

describe('CheckinByDateComponent', () => {
  let component: CheckinByDateComponent;
  let fixture: ComponentFixture<CheckinByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
