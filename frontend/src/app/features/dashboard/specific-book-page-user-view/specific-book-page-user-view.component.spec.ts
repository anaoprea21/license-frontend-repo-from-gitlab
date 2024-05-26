import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificBookPageUserViewComponent } from './specific-book-page-user-view.component';

describe('SpecificBookPageUserViewComponent', () => {
  let component: SpecificBookPageUserViewComponent;
  let fixture: ComponentFixture<SpecificBookPageUserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificBookPageUserViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificBookPageUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
