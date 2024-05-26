import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListMainComponent } from './book-list-main.component';

describe('BookListMainComponent', () => {
  let component: BookListMainComponent;
  let fixture: ComponentFixture<BookListMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
