import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByCatComponent } from './by-cat.component';

describe('ByCatComponent', () => {
  let component: ByCatComponent;
  let fixture: ComponentFixture<ByCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
