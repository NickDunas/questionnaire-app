import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsShowComponent } from './questions-show.component';

describe('QuestionsShowComponent', () => {
  let component: QuestionsShowComponent;
  let fixture: ComponentFixture<QuestionsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
