import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCartDataComponent } from './book-cart-data.component';

describe('BookCartDataComponent', () => {
  let component: BookCartDataComponent;
  let fixture: ComponentFixture<BookCartDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCartDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCartDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
