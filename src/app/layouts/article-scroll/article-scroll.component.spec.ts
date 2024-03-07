import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleScrollComponent } from './article-scroll.component';

describe('ArticleScrollComponent', () => {
  let component: ArticleScrollComponent;
  let fixture: ComponentFixture<ArticleScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleScrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
