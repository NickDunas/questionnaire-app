import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsAddComponent } from './sections-add.component';

describe('SectionsAddComponent', () => {
  let component: SectionsAddComponent;
  let fixture: ComponentFixture<SectionsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
