import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairesIndexComponent } from './questionnaires-index.component';

describe('QuestionnairesIndexComponent', () => {
  let component: QuestionnairesIndexComponent;
  let fixture: ComponentFixture<QuestionnairesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnairesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnairesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
