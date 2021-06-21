import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarBarFeaturesComponent } from './nar-bar-features.component';

describe('NarBarFeaturesComponent', () => {
  let component: NarBarFeaturesComponent;
  let fixture: ComponentFixture<NarBarFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NarBarFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NarBarFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
