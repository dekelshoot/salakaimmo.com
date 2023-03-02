import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StapesComponent } from './stapes.component';

describe('StapesComponent', () => {
  let component: StapesComponent;
  let fixture: ComponentFixture<StapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StapesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
