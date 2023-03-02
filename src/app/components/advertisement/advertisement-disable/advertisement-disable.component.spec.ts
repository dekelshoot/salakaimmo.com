import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementDisableComponent } from './advertisement-disable.component';

describe('AdvertisementDisableComponent', () => {
  let component: AdvertisementDisableComponent;
  let fixture: ComponentFixture<AdvertisementDisableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementDisableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertisementDisableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
