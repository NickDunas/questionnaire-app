import { Component, Input, OnInit } from '@angular/core';
import { Section } from '../../__common/models/Section.model';
import { ResourcesService } from '../../resources.service';
import { SnotifyService } from 'ng-snotify';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { APIItemResponse } from '../../__common/models/APIItemResponse.model';
import { APICollectionResponse } from '../../__common/models/APICollectionResponse.model';
import { QuestionsAddComponent } from '../questions-add/questions-add.component';
import { Question } from '../../__common/models/Question.model';

@Component({
  selector: 'app-questions-index',
  templateUrl: './questions-index.component.html',
  styleUrls: ['./questions-index.component.css']
})
export class QuestionsIndexComponent implements OnInit {
  @Input('section') section: Section;

  constructor(
    private resourcesService: ResourcesService,
    private snotifyService: SnotifyService,
    private ngbModal: NgbModal
  ) {}

  ngOnInit() {}

  getSection() {
    const id = this.section.id;

    this.resourcesService.getItem('section', id).subscribe(
      (response: APIItemResponse) => {
        this.section = response.data;
      },
      error => {
        this.snotifyService.error(
          `Unable to load section #${id}. Please try again.`,
          'Ooops..!'
        );
      }
    );
  }

  onItemDragEnd() {
    this.section.questions.map((question, index) => {
      return (question.order = index + 1);
    });

    this.patchQuestions();
  }

  patchQuestions() {
    const payload = this.section.questions;

    this.resourcesService.patchCollection('question', payload).subscribe(
      (response: APICollectionResponse) => {
        console.log(response);
      },
      error => {
        this.snotifyService.error(
          'Unable to patch questions collection. Please try again.',
          'Ooops..!'
        );
      }
    );
  }

  onNewQuestion() {
    const modalReference: NgbModalRef = this.ngbModal.open(
      QuestionsAddComponent,
      { size: 'lg' }
    );
    const modal = <QuestionsAddComponent>modalReference.componentInstance;
    modal.section_id = this.section.id;
    modalReference.result.then(
      postedItem => {
        if (postedItem) {
          this.getSection();
        }
      },
      () => {}
    );
  }

  onEditQuestion(item) {
    const modalReference: NgbModalRef = this.ngbModal.open(
      QuestionsAddComponent,
      { size: 'lg' }
    );
    const modal = <QuestionsAddComponent>modalReference.componentInstance;
    modal.mode = 'patch';
    modal.item = item;
    modal.section_id = this.section.id;
    modalReference.result.then(
      patchedItem => {
        if (patchedItem) {
          this.getSection();
        }
      },
      () => {}
    );
  }

  onDeleteQuestion(item) {
    this.snotifyService.confirm(
      'The selected question is going to be erased. This action is irreversible.',
      'Are you sure?',
      {
        position: 'rightTop',
        timeout: 5000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        buttons: [
          {
            text: 'Yes',
            action: toast => {
              this.deleteQuestion(item);
              this.snotifyService.remove(toast.id);
            },
            bold: false
          },
          {
            text: 'No',
            action: toast => {
              this.snotifyService.remove(toast.id);
            },
            bold: true
          }
        ]
      }
    );
  }

  deleteQuestion(item: Question) {
    const id = item.id;
    item.syncing = true;

    this.resourcesService.deleteItem('question', id).subscribe(
      response => {
        this.snotifyService.success(
          `The question #${id} has been successfully deleted.`,
          'Success!'
        );
        this.getSection();
      },
      error => {
        item.syncing = false;
        this.snotifyService.error(
          `Unable to delete question #${id}. Please try again.`,
          'Ooops..!'
        );
      }
    );
  }
}
