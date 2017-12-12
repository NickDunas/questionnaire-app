import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsIndexComponent } from './questions-index.component';

describe('QuestionsIndexComponent', () => {
  let component: QuestionsIndexComponent;
  let fixture: ComponentFixture<QuestionsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
