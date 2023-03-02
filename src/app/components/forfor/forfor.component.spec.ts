import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForforComponent } from './forfor.component';

describe('ForforComponent', () => {
  let component: ForforComponent;
  let fixture: ComponentFixture<ForforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForforComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
