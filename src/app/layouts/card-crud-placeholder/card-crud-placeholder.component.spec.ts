import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCrudPlaceholderComponent } from './card-crud-placeholder.component';

describe('CardCrudPlaceholderComponent', () => {
  let component: CardCrudPlaceholderComponent;
  let fixture: ComponentFixture<CardCrudPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCrudPlaceholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCrudPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
