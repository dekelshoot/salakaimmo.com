import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPlacehoverComponent } from './card-placehover.component';

describe('CardPlacehoverComponent', () => {
  let component: CardPlacehoverComponent;
  let fixture: ComponentFixture<CardPlacehoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPlacehoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPlacehoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
