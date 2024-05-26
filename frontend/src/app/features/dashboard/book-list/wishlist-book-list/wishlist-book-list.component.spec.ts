import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistBookListComponent } from './wishlist-book-list.component';

describe('WishlistBookListComponent', () => {
  let component: WishlistBookListComponent;
  let fixture: ComponentFixture<WishlistBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistBookListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
