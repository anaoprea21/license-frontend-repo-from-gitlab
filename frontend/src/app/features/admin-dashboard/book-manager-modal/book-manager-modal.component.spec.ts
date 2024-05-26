import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookManagerModalComponent } from './book-manager-modal.component';

describe('BookManagerModalComponent', () => {
  let component: BookManagerModalComponent;
  let fixture: ComponentFixture<BookManagerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookManagerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
