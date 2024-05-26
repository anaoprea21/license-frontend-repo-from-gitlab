import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksGenrePageMainComponent } from './books-genre-page-main.component';

describe('BooksGenrePageMainComponent', () => {
  let component: BooksGenrePageMainComponent;
  let fixture: ComponentFixture<BooksGenrePageMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksGenrePageMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksGenrePageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
