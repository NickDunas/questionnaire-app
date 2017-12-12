import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../../resources.service';
import { Questionnaire } from '../../__common/models/Questionnaire.model';
import { APICollectionResponse } from '../../__common/models/APICollectionResponse.model';
import { SnotifyService } from 'ng-snotify';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { QuestionnairesAddComponent } from '../questionnaires-add/questionnaires-add.component';

@Component({
  selector: 'app-questionnaires-index',
  templateUrl: './questionnaires-index.component.html',
  styleUrls: ['./questionnaires-index.component.css']
})
export class QuestionnairesIndexComponent implements OnInit {
  public collection: Questionnaire[] = [];
  public loadingResources = false;
  constructor(
    private resourcesService: ResourcesService,
    private snotifyService: SnotifyService,
    private ngbModal: NgbModal
  ) {}

  ngOnInit() {
    this.getQuestionnaires();
  }

  getQuestionnaires() {
    this.loadingResources = true;

    this.resourcesService.getCollection('questionnaire').subscribe(
      (response: APICollectionResponse) => {
        this.collection = response.data;
        this.loadingResources = false;
      },
      error => {
        this.loadingResources = false;
        this.snotifyService.error(
          'Unable to load questionnaires. Please try again.',
          'Ooops..!'
        );
      }
    );
  }

  onNewQuestionnaire() {
    const modalReference: NgbModalRef = this.ngbModal.open(
      QuestionnairesAddComponent,
      { size: 'lg' }
    );
    modalReference.result.then(
      postedItem => {
        if (postedItem) {
          this.getQuestionnaires();
        }
      },
      () => {}
    );
  }

  onEditQuestionnaire(item) {
    const modalReference: NgbModalRef = this.ngbModal.open(
      QuestionnairesAddComponent,
      { size: 'lg' }
    );
    const modal = <QuestionnairesAddComponent>modalReference.componentInstance;
    modal.mode = 'patch';
    modal.item = item;
    modalReference.result.then(
      patchedItem => {
        if (patchedItem) {
          this.getQuestionnaires();
        }
      },
      () => {}
    );
  }

  onDeleteQuestionnaire(item) {
    this.snotifyService.confirm(
      'The selected questionnaire is going to be erased. This action is irreversible.',
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
              this.deleteQuestionnaire(item);
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

  deleteQuestionnaire(item: Questionnaire) {
    const id = item.id;
    item.syncing = true;

    this.resourcesService.deleteItem('questionnaire', id).subscribe(
      response => {
        this.snotifyService.success(
          `The questionnaire #${id} has been successfully deleted.`,
          'Success!'
        );
        this.getQuestionnaires();
      },
      error => {
        item.syncing = false;
        this.snotifyService.error(
          `Unable to delete questionnaire #${id}. Please try again.`,
          'Ooops..!'
        );
      }
    );
  }
}
