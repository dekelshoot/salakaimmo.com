import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHorizontalPlacehoverComponent } from './card-horizontal-placehover.component';

describe('CardHorizontalPlacehoverComponent', () => {
  let component: CardHorizontalPlacehoverComponent;
  let fixture: ComponentFixture<CardHorizontalPlacehoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardHorizontalPlacehoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardHorizontalPlacehoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
