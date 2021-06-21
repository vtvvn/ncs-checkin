import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseByCountryComponent } from './case-by-country.component';

describe('CaseByCountryComponent', () => {
  let component: CaseByCountryComponent;
  let fixture: ComponentFixture<CaseByCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseByCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseByCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
