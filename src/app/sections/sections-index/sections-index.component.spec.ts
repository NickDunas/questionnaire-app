import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsIndexComponent } from './sections-index.component';

describe('SectionsIndexComponent', () => {
  let component: SectionsIndexComponent;
  let fixture: ComponentFixture<SectionsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
