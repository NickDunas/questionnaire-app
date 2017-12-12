import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairesAddComponent } from './questionnaires-add.component';

describe('QuestionnairesAddComponent', () => {
  let component: QuestionnairesAddComponent;
  let fixture: ComponentFixture<QuestionnairesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnairesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnairesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
