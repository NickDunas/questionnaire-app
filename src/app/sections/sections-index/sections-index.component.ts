import { Component, Input, OnInit } from '@angular/core';
import { Section } from '../../__common/models/Section.model';
import { ResourcesService } from '../../resources.service';
import { SnotifyService } from 'ng-snotify';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SectionsAddComponent } from '../sections-add/sections-add.component';
import { Questionnaire } from '../../__common/models/Questionnaire.model';
import { APIItemResponse } from '../../__common/models/APIItemResponse.model';
import { APICollectionResponse } from '../../__common/models/APICollectionResponse.model';

@Component({
  selector: 'app-sections-index',
  templateUrl: './sections-index.component.html',
  styleUrls: ['./sections-index.component.css']
})
export class SectionsIndexComponent implements OnInit {
  @Input('questionnaire') questionnaire: Questionnaire;

  constructor(
    private resourcesService: ResourcesService,
    private snotifyService: SnotifyService,
    private ngbModal: NgbModal
  ) {}

  ngOnInit() {}

  getQuestionnaire() {
    const id = this.questionnaire.id;

    this.resourcesService.getItem('questionnaire', id).subscribe(
      (response: APIItemResponse) => {
        this.questionnaire = response.data;
      },
      error => {
        this.snotifyService.error(
          `Unable to load questionnaire #${id}. Please try again.`,
          'Ooops..!'
        );
      }
    );
  }

  onItemDragEnd() {
    this.questionnaire.sections.map((section, index) => {
      return (section.order = index + 1);
    });

    this.patchSections();
  }

  patchSections() {
    const payload = this.questionnaire.sections;

    this.resourcesService.patchCollection('section', payload).subscribe(
      (response: APICollectionResponse) => {},
      error => {
        this.snotifyService.error(
          'Unable to update sections order. Please try again.',
          'Ooops..!'
        );
      }
    );
  }

  onNewSection() {
    const modalReference: NgbModalRef = this.ngbModal.open(
      SectionsAddComponent,
      { size: 'lg' }
    );
    const modal = <SectionsAddComponent>modalReference.componentInstance;
    modal.questionnaire_id = this.questionnaire.id;
    modalReference.result.then(
      postedItem => {
        if (postedItem) {
          this.getQuestionnaire();
        }
      },
      () => {}
    );
  }

  onEditSection(item) {
    const modalReference: NgbModalRef = this.ngbModal.open(
      SectionsAddComponent,
      { size: 'lg' }
    );
    const modal = <SectionsAddComponent>modalReference.componentInstance;
    modal.mode = 'patch';
    modal.item = item;
    modal.questionnaire_id = this.questionnaire.id;
    modalReference.result.then(
      patchedItem => {
        if (patchedItem) {
          this.getQuestionnaire();
        }
      },
      () => {}
    );
  }

  onDeleteSection(item) {
    this.snotifyService.confirm(
      'The selected section is going to be erased. This action is irreversible.',
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
              this.deleteSection(item);
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

  deleteSection(item: Section) {
    const id = item.id;
    item.syncing = true;

    this.resourcesService.deleteItem('section', id).subscribe(
      response => {
        this.snotifyService.success(
          `The section #${id} has been successfully deleted.`,
          'Success!'
        );
        this.getQuestionnaire();
      },
      error => {
        item.syncing = false;
        this.snotifyService.error(
          `Unable to delete section #${id}. Please try again.`,
          'Ooops..!'
        );
      }
    );
  }
}
