import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationResultComponent } from './declaration-result.component';

describe('DeclarationResultComponent', () => {
  let component: DeclarationResultComponent;
  let fixture: ComponentFixture<DeclarationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclarationResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
