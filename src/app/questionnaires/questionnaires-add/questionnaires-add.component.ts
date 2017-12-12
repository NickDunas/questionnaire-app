import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../../resources.service';
import { APIItemResponse } from '../../__common/models/APIItemResponse.model';
import { SnotifyService } from 'ng-snotify';
import { Questionnaire } from '../../__common/models/Questionnaire.model';

@Component({
  selector: 'app-questionnaires-add',
  templateUrl: './questionnaires-add.component.html',
  styleUrls: ['./questionnaires-add.component.css']
})
export class QuestionnairesAddComponent implements OnInit {
  public syncingResource = false;
  public mode = 'post';
  public resourceFormGroup: FormGroup;
  public item: Questionnaire;

  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private snotifyService: SnotifyService,
    private resourcesService: ResourcesService
  ) {
    this.initResourceForm();
  }

  ngOnInit() {
    if (this.item) {
      this.initResourceFormValues();
    }
  }

  initResourceForm() {
    this.resourceFormGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['']
    });
  }

  initResourceFormValues() {
    this.resourceFormGroup.controls['title'].setValue(this.item.title);
    this.resourceFormGroup.controls['description'].setValue(
      this.item.description
    );
  }

  postQuestionnaire() {
    const payload = this.resourceFormGroup.value;
    this.syncingResource = true;

    this.resourcesService.postItem('questionnaire', payload).subscribe(
      (response: APIItemResponse) => {
        this.snotifyService.success(
          'The questionnaire has been successfully created.',
          'Success!'
        );
        this.supplyItem(response.data);
        this.syncingResource = false;
      },
      error => {
        this.snotifyService.error(
          'Unable to save questionnaire. Please try again.',
          'Ooops..!'
        );
        this.syncingResource = false;
      }
    );
  }

  patchQuestionnaire() {
    const payload = this.resourceFormGroup.value;
    payload.id = this.item.id;
    this.syncingResource = true;

    this.resourcesService.patchItem('questionnaire', payload).subscribe(
      (response: APIItemResponse) => {
        this.snotifyService.success(
          'The questionnaire has been successfully updated.',
          'Success!'
        );
        this.supplyItem(response.data);
        this.syncingResource = false;
      },
      error => {
        this.snotifyService.error(
          'Unable to update questionnaire. Please try again.',
          'Ooops..!'
        );
        this.syncingResource = false;
      }
    );
  }

  supplyItem(item: Questionnaire) {
    this.item = item;
    this.ngbActiveModal.close(this.item);
  }

  onSaveQuestionnaire() {
    this.mode === 'post' ? this.postQuestionnaire() : this.patchQuestionnaire();
  }

  onCloseModal() {
    this.ngbActiveModal.close(null);
  }
}
