import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilBarComponent } from './accueil-bar.component';

describe('AccueilBarComponent', () => {
  let component: AccueilBarComponent;
  let fixture: ComponentFixture<AccueilBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
