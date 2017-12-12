import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairesShowComponent } from './questionnaires-show.component';

describe('QuestionnairesShowComponent', () => {
  let component: QuestionnairesShowComponent;
  let fixture: ComponentFixture<QuestionnairesShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnairesShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnairesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
