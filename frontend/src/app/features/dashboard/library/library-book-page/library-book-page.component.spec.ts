import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookPageComponent } from './library-book-page.component';

describe('LibraryBookPageComponent', () => {
  let component: LibraryBookPageComponent;
  let fixture: ComponentFixture<LibraryBookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryBookPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
