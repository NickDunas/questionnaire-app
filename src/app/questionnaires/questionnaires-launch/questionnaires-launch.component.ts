import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { ResourcesService } from '../../resources.service';
import { Questionnaire } from '../../__common/models/Questionnaire.model';
import { Section } from '../../__common/models/Section.model';
import { Answer } from '../../__common/models/Answer.model';
import { APIItemResponse } from '../../__common/models/APIItemResponse.model';
import { APICollectionResponse } from '../../__common/models/APICollectionResponse.model';
import { Question } from '../../__common/models/Question.model';

@Component({
  selector: 'app-questionnaires-launch',
  templateUrl: './questionnaires-launch.component.html',
  styleUrls: ['./questionnaires-launch.component.css']
})
export class QuestionnairesLaunchComponent implements OnInit {
  public item: Questionnaire;
  public answers: Answer[];
  public loadingResource = false;
  public id: number;
  private subscription: any;
  public checkboxes = [];

  constructor(
    private resourcesService: ResourcesService,
    private snotifyService: SnotifyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchItemId();
  }

  fetchItemId() {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];

      this.getQuestionnaire();
    });
  }

  getQuestionnaire() {
    const id = this.id;
    this.loadingResource = true;

    this.resourcesService.getItem('questionnaire', id).subscribe(
      (response: APIItemResponse) => {
        this.item = response.data;
        this.loadingResource = false;
        this.getSections();
      },
      error => {
        this.loadingResource = false;
        this.snotifyService.error(
          'Unable to load questionnaire. Please try again.',
          'Ooops..!'
        );
      }
    );
  }

  getSections() {
    this.item.sections.forEach(section => {
      this.getSection(section);
    });
  }

  getSection(section: Section) {
    const id = section.id;
    section.syncing = true;

    this.resourcesService.getItem('section', id).subscribe(
      (response: APIItemResponse) => {
        section = response.data;
        this.updateSection(section);
        section.syncing = false;
      },
      error => {
        section.syncing = false;
        this.snotifyService.error(
          'Unable to load section. Please try again.',
          'Ooops..!'
        );
      }
    );
  }

  updateSection(section: Section) {
    const section_index = this.item.sections.findIndex(
      element => element.id === section.id
    );
    this.item.sections[section_index] = section;
  }

  postAnswers(payload) {
    this.resourcesService.postCollection('answer', payload).subscribe(
      (response: APICollectionResponse) => {
        this.answers = response.data;
        this.snotifyService.success(
          'Your answers have been submitted. Thank you for your time!',
          'Thank you!'
        );
      },
      error => {
        this.snotifyService.error(
          'Unable to store answers. Please try again.',
          'Ooops..!'
        );
      }
    );
  }

  onAnswersSubmit(values: any) {
    const payload = [];

    const array = Object.keys(values).map(function(key) {
      return { [key]: values[key] };
    });

    array.forEach(element => {
      payload.push({
        question_id: +Object.keys(element)[0],
        value: element[Object.keys(element)[0]]
      });
    });

    this.postAnswers(payload);
  }

  onCheckboxChange($event, question, index) {
    const array: string[] = this.checkboxes[question.id]
      ? this.checkboxes[question.id].split(',')
      : [];
    const exists = array.find(item => {
      return +item === +index;
    });
    if (exists === undefined && $event.srcElement.checked) {
      array.push(index);
    } else if (!$event.srcElement.checked) {
      const itemIndex = array.findIndex(item => {
        return +item === +index;
      });
      array.splice(itemIndex, 1);
    }
    this.checkboxes[question.id] = array.join(',');
  }

  getAnswer(question: Question) {
    const answer = this.answers.find(
      element => element.question_id === question.id
    );

    if (+question.input_type === 0 || +question.input_type === 1 || !question.available_values || !answer.value) {
      return answer.value;
    }

    if (+question.input_type === 2 || +question.input_type === 4) {
      const available_values = question.available_values.split(',');
      return available_values[+answer.value];
    }

    if (+question.input_type === 3) {
      const available_values = question.available_values.split(',');
      const values = [];
      answer.value
        .split(',')
        .forEach(value => values.push(available_values[+value]));
      return values.join(', ');
    }

    return answer.value;
  }
}
