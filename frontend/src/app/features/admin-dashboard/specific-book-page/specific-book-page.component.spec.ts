import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificBookPageComponent } from './specific-book-page.component';

describe('SpecificBookPageComponent', () => {
  let component: SpecificBookPageComponent;
  let fixture: ComponentFixture<SpecificBookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificBookPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
