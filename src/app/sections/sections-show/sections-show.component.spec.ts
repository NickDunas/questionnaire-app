import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsShowComponent } from './sections-show.component';

describe('SectionsShowComponent', () => {
  let component: SectionsShowComponent;
  let fixture: ComponentFixture<SectionsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
