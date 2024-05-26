import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBookListComponent } from './cart-book-list.component';

describe('CartBookListComponent', () => {
  let component: CartBookListComponent;
  let fixture: ComponentFixture<CartBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartBookListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
