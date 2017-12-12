import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairesLaunchComponent } from './questionnaires-launch.component';

describe('QuestionnairesLaunchComponent', () => {
  let component: QuestionnairesLaunchComponent;
  let fixture: ComponentFixture<QuestionnairesLaunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnairesLaunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnairesLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
